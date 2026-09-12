"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllOrders } from "@/lib/firebase/orders";
import { Order, OrderStatus } from "@/types/admin";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch {
      console.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    return true;
  });

  const columns = [
    {
      key: "id",
      header: "Order ID",
      render: (order: Order) => (
        <span className="font-mono text-sm">#{order.id.slice(-8)}</span>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (order: Order) => (
        <div>
          <p className="font-medium">{order.customerName}</p>
          <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
        </div>
      ),
    },
    {
      key: "items",
      header: "Items",
      render: (order: Order) => order.items.length,
    },
    {
      key: "total",
      header: "Total",
      render: (order: Order) => (
        <span className="font-medium">Rs.{order.total.toLocaleString()}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (order: Order) => <StatusBadge status={order.status} />,
    },
    {
      key: "date",
      header: "Date",
      render: (order: Order) => (
        <span className="text-muted-foreground">
          {format(new Date(order.createdAt), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-20",
      render: (order: Order) => (
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/admin/orders/${order.id}`}>
            <Eye className="size-4" />
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          View and manage customer orders
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        data={filteredOrders as unknown as Record<string, unknown>[]}
        columns={columns as unknown as { key: string; header: string; render?: (item: Record<string, unknown>) => React.ReactNode; className?: string }[]}
        keyExtractor={(item) => (item as unknown as Order).id}
        searchKey="customerName"
        searchPlaceholder="Search by customer..."
        emptyMessage="No orders found"
        loading={loading}
      />
    </div>
  );
}
