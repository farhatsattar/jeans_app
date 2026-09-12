"use client";

import { OrderStatus } from "@/types/admin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

interface OrderStatusSelectProps {
  value: OrderStatus;
  onChange: (status: OrderStatus) => Promise<void>;
  disabled?: boolean;
}

export function OrderStatusSelect({
  value,
  onChange,
  disabled,
}: OrderStatusSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(newValue) => onChange(newValue as OrderStatus)}
      disabled={disabled}
    >
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
