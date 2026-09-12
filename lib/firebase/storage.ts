import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import { storage } from "./config";

export async function uploadImage(
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  }
  );
}

export async function uploadImages(
  files: File[],
  path: string,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const url = await uploadImage(files[i], `${path}/${Date.now()}_${files[i].name}`, (progress) => {
      onProgress?.(i, progress);
    });
    urls.push(url);
  }
  return urls;
}

export async function deleteImage(url: string): Promise<void> {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}

export async function deleteImages(urls: string[]): Promise<void> {
  await Promise.all(urls.map((url) => deleteImage(url)));
}

export async function listImages(path: string): Promise<string[]> {
  const storageRef = ref(storage, path);
  const result = await listAll(storageRef);
  const urls = await Promise.all(
    result.items.map((itemRef) => getDownloadURL(itemRef))
  );
  return urls;
}

export function generateImagePath(prefix: string, filename: string): string {
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  return `${prefix}/${timestamp}_${sanitizedFilename}`;
}
