"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "@/lib/firebase/products";
import { uploadImage } from "@/lib/firebase/storage";
import { toast } from "sonner";
import { Product } from "@/types/admin";

export default function NewProductPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    setSubmitting(true);
    try {
      const id = await createProduct(data);
      toast.success("Product created successfully");
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Failed to create product";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadImage = async (file: File): Promise<string> => {
    return uploadImage(file, `products/${Date.now()}_${file.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Product</h1>
          <p className="text-muted-foreground">
            Create a new product for your store
          </p>
        </div>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        onUploadImage={handleUploadImage}
        submitting={submitting}
      />
    </div>
  );
}
