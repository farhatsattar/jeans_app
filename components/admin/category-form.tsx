"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "./image-uploader";
import { Category } from "@/types/admin";

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  initialData?: Partial<Category>;
  onSubmit: (data: Omit<Category, "id" | "createdAt">) => Promise<void>;
  onUploadImage?: (file: File) => Promise<string>;
  submitting?: boolean;
}

export function CategoryForm({
  initialData,
  onSubmit,
  onUploadImage,
  submitting = false,
}: CategoryFormProps) {
  const [image, setImage] = useState<string>(initialData?.image || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  const handleFormSubmit = async (data: CategoryFormData) => {
    if (!image) {
      alert("Please add a category image");
      return;
    }
    await onSubmit({
      ...data,
      image,
      slug: data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="max-w-xl space-y-6">
        <div>
          <Label htmlFor="name">Category Name</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Winter Collection"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Describe this category..."
            rows={4}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <Label>Category Image</Label>
          <div className="mt-2">
            <ImageUploader
              images={image ? [image] : []}
              onChange={(images) => setImage(images[0] || "")}
              onUpload={onUploadImage}
              maxImages={1}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="mr-2 size-4 animate-spin" />}
            {initialData?.id ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </div>
    </form>
  );
}
