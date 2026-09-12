"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllProducts, deleteProduct, updateProduct } from "@/lib/firebase/products";
import { Product } from "@/types/admin";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
    if (statusFilter === "active" && !p.isActive) return false;
    if (statusFilter === "inactive" && p.isActive) return false;
    return true;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteId);
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      await updateProduct(product.id, { isActive: !product.isActive });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, isActive: !p.isActive } : p
        )
      );
      toast.success(
        product.isActive ? "Product deactivated" : "Product activated"
      );
    } catch {
      toast.error("Failed to update product");
    }
  };

  const columns = [
    {
      key: "image",
      header: "Image",
      className: "w-20",
      render: (product: Product) => (
        <div className="relative size-12 overflow-hidden rounded">
          {product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
        </div>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (product: Product) => (
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (product: Product) => <Badge variant="secondary">{product.category}</Badge>,
    },
    {
      key: "price",
      header: "Price",
      render: (product: Product) => (
        <div>
          <p className="font-medium">Rs.{product.price.toLocaleString()}</p>
          {product.discountPrice && (
            <p className="text-xs text-muted-foreground line-through">
              Rs.{product.discountPrice.toLocaleString()}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (product: Product) => (
        <span
          className={
            product.stock < 5 ? "text-red-600" : ""
          }
        >
          {product.stock}
        </span>
      ),
    },
    {
      key: "featured",
      header: "Featured",
      className: "w-24",
      render: (product: Product) =>
        product.isFeatured ? (
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
        ) : null,
    },
    {
      key: "status",
      header: "Status",
      className: "w-24",
      render: (product: Product) => (
        <Switch
          checked={product.isActive}
          onCheckedChange={() => handleToggleActive(product)}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-32",
      render: (product: Product) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href={`/admin/products/${product.id}`}>
              <Edit className="size-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setDeleteId(product.id)}
          >
            <Trash2 className="size-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 size-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Shalwar Kameez">Shalwar Kameez</SelectItem>
            <SelectItem value="Kurta">Kurta</SelectItem>
            <SelectItem value="Dupatta">Dupatta</SelectItem>
            <SelectItem value="Trouser">Trouser</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        data={filteredProducts as unknown as Record<string, unknown>[]}
        columns={columns as unknown as { key: string; header: string; render?: (item: Record<string, unknown>) => React.ReactNode; className?: string }[]}
        keyExtractor={(item) => (item as unknown as Product).id}
        searchKey="name"
        searchPlaceholder="Search products..."
        emptyMessage="No products found"
        loading={loading}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
