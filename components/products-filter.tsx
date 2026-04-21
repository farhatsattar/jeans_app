"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FiltersProps {
  query: string;
  category: string;
  color: string;
  maxPrice: number;
  sort: string;
  onChange: (key: string, value: string | number) => void;
}

export function ProductsFilter({ query, category, color, maxPrice, sort, onChange }: FiltersProps) {
  return (
    <div className="space-y-4 rounded-xl border p-4">
      <h3 className="font-medium">Filters</h3>
      <Input value={query} onChange={(e) => onChange("query", e.target.value)} placeholder="Search jeans..." />
      <Select value={category} onValueChange={(value) => onChange("category", value ?? "all")}>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Men">Men</SelectItem>
          <SelectItem value="Women">Women</SelectItem>
          <SelectItem value="Skinny">Skinny</SelectItem>
          <SelectItem value="Baggy">Baggy</SelectItem>
        </SelectContent>
      </Select>
      <Select value={color} onValueChange={(value) => onChange("color", value ?? "all")}>
        <SelectTrigger>
          <SelectValue placeholder="Color" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Colors</SelectItem>
          <SelectItem value="Blue">Blue</SelectItem>
          <SelectItem value="Black">Black</SelectItem>
          <SelectItem value="Gray">Gray</SelectItem>
        </SelectContent>
      </Select>
      <div className="space-y-2">
        <label className="text-sm">Max price: ${maxPrice}</label>
        <input
          type="range"
          min={40}
          max={120}
          value={maxPrice}
          className="w-full"
          onChange={(e) => onChange("maxPrice", Number(e.target.value))}
        />
      </div>
      <Select value={sort} onValueChange={(value) => onChange("sort", value ?? "newest")}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="low-high">Price low-high</SelectItem>
          <SelectItem value="high-low">Price high-low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
