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
import {
  KameezSizeSpec,
  Product,
  ProductCategory,
  ProductColor,
  ProductSize,
  ShalwarSizeSpec,
} from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DEFAULT_KAMEEZ_CHART,
  DEFAULT_SHALWAR_CHART,
} from "@/lib/size-chart";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum([
    "Winter Collection",
    "Cotton Elegant Embroidery Suit",
    "Jeans / Trousers",
    "Fancy Wear",
    "Jewelry",
    "Handbags / Purse",
  ]),
  price: z.number().min(0, "Price must be positive"),
  discountPrice: z.number().min(0).optional(),
  stock: z.number().int().min(0, "Stock must be positive"),
  sku: z.string().min(1, "SKU is required"),
  sizes: z.array(z.enum(["S", "M", "L", "XL", "One Size"])).min(1, "Select at least one size"),
  colors: z
    .array(
      z.enum([
        "Red",
        "Green",
        "Blue",
        "White",
        "Black",
        "Pink",
        "Orange",
        "Ivory",
        "Maroon",
        "Gold",
        "Champagne",
        "Beige",
        "Navy",
        "Gray",
        "Burgundy",
        "Violet",
      ])
    )
    .min(1, "Select at least one color"),
  tags: z.string(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  isSoldOut: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  onUploadImage?: (file: File) => Promise<string>;
  submitting?: boolean;
}

const ALL_SIZES: ProductSize[] = ["S", "M", "L", "XL", "One Size"];
const CHART_SIZES: Array<"S" | "M" | "L" | "XL"> = ["S", "M", "L", "XL"];

function buildDefaultKameezChart(
  existing?: KameezSizeSpec[]
): KameezSizeSpec[] {
  return CHART_SIZES.map((size) => {
    const fromExisting = existing?.find((row) => row.size === size);
    const fromDefault = DEFAULT_KAMEEZ_CHART.find((row) => row.size === size);
    return {
      size,
      chest: fromExisting?.chest ?? fromDefault?.chest ?? 0,
      length: fromExisting?.length ?? fromDefault?.length ?? 0,
      hip: fromExisting?.hip ?? fromDefault?.hip ?? 0,
      flair: fromExisting?.flair ?? fromDefault?.flair ?? 0,
    };
  });
}

const ALL_COLORS: ProductColor[] = [
  "Red",
  "Green",
  "Blue",
  "White",
  "Black",
  "Pink",
  "Orange",
  "Ivory",
  "Maroon",
  "Gold",
  "Champagne",
  "Beige",
  "Navy",
  "Gray",
  "Burgundy",
  "Violet",
];

export function ProductForm({
  initialData,
  onSubmit,
  onUploadImage,
  submitting = false,
}: ProductFormProps) {
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [kameezChart, setKameezChart] = useState<KameezSizeSpec[]>(
    buildDefaultKameezChart(initialData?.kameezChart)
  );
  const [shalwarChart, setShalwarChart] = useState<ShalwarSizeSpec>({
    length: initialData?.shalwarChart?.length ?? DEFAULT_SHALWAR_CHART.length,
    stretchBelt:
      initialData?.shalwarChart?.stretchBelt ??
      DEFAULT_SHALWAR_CHART.stretchBelt,
    pancha: initialData?.shalwarChart?.pancha ?? DEFAULT_SHALWAR_CHART.pancha,
  });

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
      category: (initialData?.category as ProductCategory) || "Winter Collection",
      price: initialData?.price || 0,
      discountPrice: initialData?.discountPrice,
      stock: initialData?.stock || 0,
      sku: initialData?.sku || "",
      sizes: (initialData?.sizes as ProductSize[]) || ["M", "L"],
      colors: (initialData?.colors as ProductColor[]) || ["White"],
      tags: initialData?.tags?.join(", ") || "",
      isFeatured: initialData?.isFeatured || false,
      isActive: initialData?.isActive ?? true,
      isSoldOut:
        initialData?.isSoldOut ||
        (typeof initialData?.stock === "number" && initialData.stock <= 0) ||
        false,
    },
  });

  const formData = watch();
  const sizes = formData.sizes;
  const colors = formData.colors;
  const category = formData.category;
  const isFeatured = formData.isFeatured;
  const isActive = formData.isActive;
  const isSoldOut = formData.isSoldOut;

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

    const isAccessory =
      data.category === "Jewelry" || data.category === "Handbags / Purse";

    const payload: Omit<Product, "id" | "createdAt" | "updatedAt"> = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
      stock: data.stock,
      sku: data.sku,
      sizes: data.sizes,
      colors: data.colors,
      images,
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isFeatured: Boolean(data.isFeatured),
      isActive: data.isActive !== false,
      isSoldOut: Boolean(data.isSoldOut),
      ...(isAccessory
        ? {}
        : {
            kameezChart,
            shalwarChart,
          }),
    };

    if (
      typeof data.discountPrice === "number" &&
      !Number.isNaN(data.discountPrice)
    ) {
      payload.discountPrice = data.discountPrice;
    }

    await onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, () => {
        alert("Please fill all required fields correctly.");
      })}
      className="space-y-6"
    >
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
                  placeholder="Binsaeed Zari Khaddar 3pc"
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
                      <SelectItem value="Winter Collection">Winter Collection</SelectItem>
                      <SelectItem value="Cotton Elegant Embroidery Suit">Cotton Elegant Embroidery Suit</SelectItem>
                      <SelectItem value="Jeans / Trousers">Jeans / Trousers</SelectItem>
                      <SelectItem value="Fancy Wear">Fancy Wear</SelectItem>
                      <SelectItem value="Jewelry">Jewelry</SelectItem>
                      <SelectItem value="Handbags / Purse">Handbags / Purse</SelectItem>
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
                    {...register("discountPrice", {
                      setValueAs: (value) => {
                        if (value === "" || value === null || value === undefined) {
                          return undefined;
                        }
                        const parsed = Number(value);
                        return Number.isNaN(parsed) ? undefined : parsed;
                      },
                    })}
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

          {category !== "Jewelry" && category !== "Handbags / Purse" && (
            <Card>
              <CardHeader>
                <CardTitle>Shirt & Trouser Length</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Shirt / Kameez (inches)</Label>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[420px] border-collapse text-sm">
                      <thead>
                        <tr className="border-b bg-muted/40 text-left">
                          <th className="px-2 py-2">Size</th>
                          <th className="px-2 py-2">Chest</th>
                          <th className="px-2 py-2">Length</th>
                          <th className="px-2 py-2">Hip</th>
                          <th className="px-2 py-2">Flair</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kameezChart.map((row, index) => (
                          <tr key={row.size} className="border-b last:border-0">
                            <td className="px-2 py-2 font-medium">{row.size}</td>
                            {(
                              ["chest", "length", "hip", "flair"] as const
                            ).map((field) => (
                              <td key={field} className="px-2 py-2">
                                <Input
                                  type="number"
                                  value={String(row[field])}
                                  onValueChange={(value) => {
                                    const parsed = Number(value);
                                    setKameezChart((prev) =>
                                      prev.map((item, i) =>
                                        i === index
                                          ? {
                                              ...item,
                                              [field]: Number.isNaN(parsed)
                                                ? 0
                                                : parsed,
                                            }
                                          : item
                                      )
                                    );
                                  }}
                                  className="h-8 w-20"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Trouser / Shalwar</Label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <p className="text-xs text-muted-foreground">Length</p>
                      <Input
                        value={shalwarChart.length}
                        onValueChange={(value) =>
                          setShalwarChart((prev) => ({
                            ...prev,
                            length: value,
                          }))
                        }
                        placeholder="38-39"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs text-muted-foreground">
                        Stretch Belt
                      </p>
                      <Input
                        value={shalwarChart.stretchBelt}
                        onValueChange={(value) =>
                          setShalwarChart((prev) => ({
                            ...prev,
                            stretchBelt: value,
                          }))
                        }
                        placeholder="24-25"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs text-muted-foreground">Pancha</p>
                      <Input
                        value={shalwarChart.pancha}
                        onValueChange={(value) =>
                          setShalwarChart((prev) => ({
                            ...prev,
                            pancha: value,
                          }))
                        }
                        placeholder="10 inches"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
                  checked={Boolean(isActive)}
                  onCheckedChange={(checked) =>
                    setValue("isActive", Boolean(checked), { shouldValidate: true })
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
                  checked={Boolean(isFeatured)}
                  onCheckedChange={(checked) =>
                    setValue("isFeatured", Boolean(checked), {
                      shouldValidate: true,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Sold Out</Label>
                  <p className="text-xs text-muted-foreground">
                    Mark product as sold out on the store
                  </p>
                </div>
                <Switch
                  checked={Boolean(isSoldOut)}
                  onCheckedChange={(checked) =>
                    setValue("isSoldOut", Boolean(checked), {
                      shouldValidate: true,
                    })
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
