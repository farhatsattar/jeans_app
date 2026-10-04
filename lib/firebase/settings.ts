import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";
import { StoreSettings } from "@/types/admin";

const DOC_ID = "store";

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "ClothHub",
  logo: "",
  email: "support@clothhub.com",
  phone: "+92 300 0000000",
  whatsapp: "+923000000000",
  address: "Karachi, Pakistan",
  socialLinks: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
  currency: "PKR",
  currencySymbol: "Rs.",
  shippingCharges: 0,
  freeShippingThreshold: 0,
};

export async function getSettings(): Promise<StoreSettings> {
  const docSnap = await getDoc(doc(db, "settings", DOC_ID));
  if (!docSnap.exists()) {
    return DEFAULT_SETTINGS;
  }
  return { ...DEFAULT_SETTINGS, ...docSnap.data() } as StoreSettings;
}

export async function saveSettings(settings: StoreSettings): Promise<void> {
  await setDoc(doc(db, "settings", DOC_ID), settings);
}
