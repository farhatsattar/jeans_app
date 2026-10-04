"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";
import { getSettings, saveSettings } from "@/lib/firebase/settings";
import { uploadImage } from "@/lib/firebase/storage";
import { StoreSettings } from "@/types/admin";
import { toast } from "sonner";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logo, setLogo] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StoreSettings>({
    defaultValues: {
      storeName: "",
      logo: "",
      email: "",
      phone: "",
      whatsapp: "",
      address: "",
      socialLinks: {
        facebook: "",
        instagram: "",
        twitter: "",
      },
      currency: "PKR",
      currencySymbol: "Rs.",
      shippingCharges: 0,
      freeShippingThreshold: 0,
    },
  });

  const socialLinks = watch("socialLinks");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getSettings();
      setValue("storeName", data.storeName);
      setValue("email", data.email);
      setValue("phone", data.phone);
      setValue("whatsapp", data.whatsapp);
      setValue("address", data.address);
      setValue("currency", data.currency);
      setValue("currencySymbol", data.currencySymbol);
      setValue("shippingCharges", data.shippingCharges);
      setValue("freeShippingThreshold", data.freeShippingThreshold);
      setValue("socialLinks.facebook", data.socialLinks.facebook || "");
      setValue("socialLinks.instagram", data.socialLinks.instagram || "");
      setValue("socialLinks.twitter", data.socialLinks.twitter || "");
      setLogo(data.logo || "");
    } catch {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  }

  const handleLogoUpload = async (file: File): Promise<string> => {
    return uploadImage(file, `settings/logo_${Date.now()}`);
  };

  const onSubmit = async (data: StoreSettings) => {
    setSaving(true);
    try {
      await saveSettings({ ...data, logo });
      toast.success("Settings saved successfully");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your store settings
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                {...register("storeName", { required: "Store name is required" })}
              />
              {errors.storeName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.storeName.message}
                </p>
              )}
            </div>

            <div>
              <Label>Store Logo</Label>
              <div className="mt-2">
                <ImageUploader
                  images={logo ? [logo] : []}
                  onChange={(images) => setLogo(images[0] || "")}
                  onUpload={handleLogoUpload}
                  maxImages={1}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Store Address</Label>
              <Textarea
                id="address"
                {...register("address")}
                rows={2}
                placeholder="123 Main Street, City, Country"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("phone")} placeholder="+92 300 0000000" />
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" {...register("whatsapp")} placeholder="+923000000000" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                {...register("socialLinks.facebook")}
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                {...register("socialLinks.instagram")}
                placeholder="https://instagram.com/yourpage"
              />
            </div>

            <div>
              <Label htmlFor="twitter">Twitter / X</Label>
              <Input
                id="twitter"
                {...register("socialLinks.twitter")}
                placeholder="https://twitter.com/yourpage"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Currency & Shipping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="currency">Currency Code</Label>
                <Input id="currency" {...register("currency")} placeholder="PKR" />
              </div>

              <div>
                <Label htmlFor="currencySymbol">Currency Symbol</Label>
                <Input
                  id="currencySymbol"
                  {...register("currencySymbol")}
                  placeholder="Rs."
                />
              </div>

              <div>
                <Label htmlFor="shippingCharges">Shipping Charges</Label>
                <Input
                  id="shippingCharges"
                  type="number"
                  {...register("shippingCharges", { valueAsNumber: true })}
                />
              </div>

              <div className="md:col-span-3">
                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold</Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  {...register("freeShippingThreshold", { valueAsNumber: true })}
                  placeholder="5000"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Free shipping for orders above this amount
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
