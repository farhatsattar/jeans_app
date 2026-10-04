"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  onUpload?: (file: File) => Promise<string>;
  maxImages?: number;
}

export function ImageUploader({
  images,
  onChange,
  onUpload,
  maxImages = 6,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const remainingImages = Math.max(maxImages - images.length, 0);
  const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const useCloudinary = Boolean(cloudinaryPreset);

  const handleUploadSuccess = (result: {
    info?: { secure_url?: string } | string;
  }) => {
    const info = result?.info;
    const secureUrl =
      typeof info === "string"
        ? info
        : info && typeof info === "object"
          ? info.secure_url
          : undefined;

    if (!secureUrl) {
      console.error("Cloudinary URL not found:", result);
      setIsUploading(false);
      toast.error("Image upload failed");
      return;
    }

    onChange([...images, secureUrl]);
    setIsUploading(false);
  };

  const handleUploadError = (error: unknown) => {
    console.error("Cloudinary upload error:", error);
    setIsUploading(false);
    toast.error("Image upload failed");
  };

  const handleLocalFiles = async (files: FileList | null) => {
    if (!files?.length || !onUpload) return;

    const selected = Array.from(files).slice(0, remainingImages);
    setIsUploading(true);

    try {
      const uploaded: string[] = [];
      for (const file of selected) {
        const url = await onUpload(file);
        uploaded.push(url);
      }
      onChange([...images, ...uploaded]);
      toast.success(
        uploaded.length === 1
          ? "Image uploaded"
          : `${uploaded.length} images uploaded`
      );
    } catch (error) {
      console.error("Firebase upload error:", error);
      toast.error("Image upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, imageIndex) => imageIndex !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
            >
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />

              {index === 0 && (
                <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white">
                  Main Image
                </div>
              )}

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 shadow transition group-hover:opacity-100 hover:bg-red-700"
                aria-label={`Remove image ${index + 1}`}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {remainingImages > 0 && useCloudinary && (
        <CldUploadWidget
          uploadPreset={cloudinaryPreset}
          options={{
            sources: ["local"],
            multiple: true,
            maxFiles: remainingImages,
            resourceType: "image",
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 5 * 1024 * 1024,
            folder: "clothhub/products",
            cropping: false,
            showAdvancedOptions: false,
            showCompletedButton: true,
            showUploadMoreButton: true,
          }}
          onOpen={() => {
            setIsUploading(true);
          }}
          onSuccess={handleUploadSuccess}
          onError={handleUploadError}
          onClose={() => {
            setIsUploading(false);
          }}
        >
          {({ open }) => (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isUploading}
              onClick={() => open()}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <ImagePlus className="mr-2 size-4" />
                  Add Product Images
                </>
              )}
            </Button>
          )}
        </CldUploadWidget>
      )}

      {remainingImages > 0 && !useCloudinary && onUpload && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(event) => handleLocalFiles(event.target.files)}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <ImagePlus className="mr-2 size-4" />
                Add Product Images
              </>
            )}
          </Button>
        </>
      )}

      <div className="space-y-1 text-xs text-muted-foreground">
        <p>
          {images.length} / {maxImages} images uploaded
        </p>
        <p>JPG, JPEG, PNG or WebP • Maximum 5 MB per image</p>
        {images.length === 0 && (
          <p className="text-amber-600">
            Please add at least one product image.
          </p>
        )}
      </div>
    </div>
  );
}
