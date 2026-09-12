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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "./image-uploader";
import { Product, ProductCategory, ProductColor, ProductSize } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["Shalwar Kameez", "Kurta", "Dupatta", "Trouser"]),
  price: z.number().min(0, "Price must be positive"),
  discountPrice: z.number().min(0).optional(),
  stock: z.number().int().min(0, "Stock must be positive"),
  sku: z.string().min(1, "SKU is required"),
  sizes: z.array(z.enum(["S", "M", "L", "XL"])).min(1, "Select at least one size"),
  colors: z.array(z.enum(["Red", "Green", "Blue", "White", "Black", "Pink"])).min(1, "Select at least one color"),
  tags: z.string(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  onUploadImage?: (file: File) => Promise<string>;
  submitting?: boolean;
}

const ALL_SIZES: ProductSize[] = ["S", "M", "L", "XL"];
const ALL_COLORS: ProductColor[] = ["Red", "Green", "Blue", "White", "Black", "Pink"];

export function ProductForm({
  initialData,
  onSubmit,
  onUploadImage,
  submitting = false,
}: ProductFormProps) {
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      category: (initialData?.category as ProductCategory) || "Shalwar Kameez",
      price: initialData?.price || 0,
      discountPrice: initialData?.discountPrice,
      stock: initialData?.stock || 0,
      sku: initialData?.sku || "",
      sizes: (initialData?.sizes as ProductSize[]) || ["M", "L"],
      colors: (initialData?.colors as ProductColor[]) || ["White"],
      tags: initialData?.tags?.join(", ") || "",
      isFeatured: initialData?.isFeatured || false,
      isActive: initialData?.isActive ?? true,
    },
  });

  const formData = watch();
  const sizes = formData.sizes;
  const colors = formData.colors;
  const category = formData.category;
  const isFeatured = formData.isFeatured;
  const isActive = formData.isActive;

  const toggleSize = (size: ProductSize) => {
    const newSizes = sizes.includes(size)
      ? sizes.filter((s) => s !== size)
      : [...sizes, size];
    setValue("sizes", newSizes, { shouldValidate: true });
  };

  const toggleColor = (color: ProductColor) => {
    const newColors = colors.includes(color)
      ? colors.filter((c) => c !== color)
      : [...colors, color];
    setValue("colors", newColors, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: ProductFormData) => {
    if (images.length === 0) {
      alert("Please add at least one product image");
      return;
    }
    await onSubmit({
      ...data,
      images,
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Premium Cotton Kurta"
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
                  placeholder="Detailed product description..."
                  rows={4}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={category}
                    onValueChange={(value) =>
                      setValue("category", value as ProductCategory, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Shalwar Kameez">Shalwar Kameez</SelectItem>
                      <SelectItem value="Kurta">Kurta</SelectItem>
                      <SelectItem value="Dupatta">Dupatta</SelectItem>
                      <SelectItem value="Trouser">Trouser</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    {...register("sku")}
                    placeholder="KUR-001"
                  />
                  {errors.sku && (
                    <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price (Rs.)</Label>
                  <Input
                    id="price"
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                    placeholder="0"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="discountPrice">Discount Price (Rs.)</Label>
                  <Input
                    id="discountPrice"
                    type="number"
                    {...register("discountPrice", { valueAsNumber: true })}
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    {...register("stock", { valueAsNumber: true })}
                    placeholder="0"
                  />
                  {errors.stock && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Available Sizes</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ALL_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                        sizes.includes(size)
                          ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "border-border hover:border-blue-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {errors.sizes && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.sizes.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Available Colors</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ALL_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => toggleColor(color)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                        colors.includes(color)
                          ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "border-border hover:border-blue-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
                {errors.colors && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.colors.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  {...register("tags")}
                  placeholder="cotton, summer, casual"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUploader
                images={images}
                onChange={setImages}
                onUpload={onUploadImage}
                maxImages={6}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Active</Label>
                  <p className="text-xs text-muted-foreground">
                    Show this product on the store
                  </p>
                </div>
                <Switch
                  checked={isActive}
                  onCheckedChange={(checked) =>
                    setValue("isActive", checked, { shouldValidate: true })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Featured</Label>
                  <p className="text-xs text-muted-foreground">
                    Show in featured products
                  </p>
                </div>
                <Switch
                  checked={isFeatured}
                  onCheckedChange={(checked) =>
                    setValue("isFeatured", checked, { shouldValidate: true })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={submitting}>
          {submitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          {initialData?.id ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
