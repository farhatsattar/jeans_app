"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { getAllCustomers } from "@/lib/firebase/customers";
import { Customer } from "@/types/admin";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch {
      console.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    {
      key: "name",
      header: "Customer",
      render: (customer: Customer) => (
        <div>
          <p className="font-medium">{customer.name}</p>
          <p className="text-xs text-muted-foreground">{customer.email}</p>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (customer: Customer) => (
        <span className="text-muted-foreground">{customer.phone || "-"}</span>
      ),
    },
    {
      key: "orders",
      header: "Orders",
      render: (customer: Customer) => customer.totalOrders,
    },
    {
      key: "spent",
      header: "Total Spent",
      render: (customer: Customer) => (
        <span className="font-medium">
          Rs.{customer.totalSpent.toLocaleString()}
        </span>
      ),
    },
    {
      key: "joined",
      header: "Joined",
      render: (customer: Customer) => (
        <span className="text-muted-foreground">
          {format(new Date(customer.createdAt), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-20",
      render: (customer: Customer) => (
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href={`/admin/customers/${customer.id}`}>
            <Eye className="size-4" />
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-muted-foreground">
          View and manage your customers
        </p>
      </div>

      <DataTable
        data={customers as unknown as Record<string, unknown>[]}
        columns={columns as unknown as { key: string; header: string; render?: (item: Record<string, unknown>) => React.ReactNode; className?: string }[]}
        keyExtractor={(item) => (item as unknown as Customer).id}
        searchKey="name"
        searchPlaceholder="Search customers..."
        emptyMessage="No customers found"
        loading={loading}
      />
    </div>
  );
}
