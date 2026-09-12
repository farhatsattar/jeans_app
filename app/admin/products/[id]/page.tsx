"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/product-form";
import { getProduct, updateProduct } from "@/lib/firebase/products";
import { uploadImage } from "@/lib/firebase/storage";
import { toast } from "sonner";
import { Product } from "@/types/admin";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(id);
        if (!data) {
          toast.error("Product not found");
          router.push("/admin/products");
          return;
        }
        setProduct(data);
      } catch {
        toast.error("Failed to load product");
        router.push("/admin/products");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id, router]);

  const handleSubmit = async (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    setSubmitting(true);
    try {
      await updateProduct(id, data);
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadImage = async (file: File): Promise<string> => {
    return uploadImage(file, `products/${Date.now()}_${file.name}`);
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">
            Update product information
          </p>
        </div>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        onUploadImage={handleUploadImage}
        submitting={submitting}
      />
    </div>
  );
}
