"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import { SeedDatabasePanel } from "@/components/admin/seed-database-panel";
import { RevenueChart, CategoryPieChart } from "@/components/admin/revenue-chart";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/firebase/products";
import { getAllOrders } from "@/lib/firebase/orders";
import { getAllCustomers } from "@/lib/firebase/customers";
import {
  DashboardStats,
  ChartDataPoint,
  CategorySales,
  Order,
  Product,
  Customer,
} from "@/types/admin";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [categorySales, setCategorySales] = useState<CategorySales[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, ordersData, customersData] = await Promise.all([
        getAllProducts(),
        getAllOrders(),
        getAllCustomers(),
      ]);

      setProducts(productsData);
      setCustomers(customersData);

      const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
      setStats({
        totalProducts: productsData.length,
        totalOrders: ordersData.length,
        totalCustomers: customersData.length,
        totalRevenue,
      });

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split("T")[0];
      });

      const chartDataPoints: ChartDataPoint[] = last7Days.map((date) => {
        const dayOrders = ordersData.filter((order) =>
          order.createdAt.startsWith(date)
        );
        return {
          date,
          label: format(new Date(date), "EEE"),
          revenue: dayOrders.reduce((sum, o) => sum + o.total, 0),
          orders: dayOrders.length,
        };
      });
      setChartData(chartDataPoints);

      const categoryMap = new Map<string, number>();
      productsData.forEach((p) => {
        const count = categoryMap.get(p.category) || 0;
        categoryMap.set(p.category, count + 1);
      });
      setCategorySales(
        Array.from(categoryMap.entries()).map(([category, count]) => ({
          category,
          count,
          sales: count * 1000,
        }))
      );

      setRecentOrders(ordersData.slice(0, 5));
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your store.
        </p>
      </div>

      {!loading &&
        stats.totalProducts === 0 &&
        stats.totalOrders === 0 &&
        stats.totalCustomers === 0 && (
          <SeedDatabasePanel onSeeded={loadData} />
        )}

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={loading ? "-" : stats.totalProducts}
          icon={Package}
          description="Active products in store"
        />
        <StatCard
          title="Total Orders"
          value={loading ? "-" : stats.totalOrders}
          icon={ShoppingCart}
          description="All time orders"
        />
        <StatCard
          title="Total Customers"
          value={loading ? "-" : stats.totalCustomers}
          icon={Users}
          description="Registered customers"
        />
        <StatCard
          title="Total Revenue"
          value={loading ? "-" : `Rs.${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          description="Revenue from all orders"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={chartData} />
        <CategoryPieChart data={categorySales} />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/orders">
              View All <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded bg-muted" />
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No orders yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">#{order.id.slice(-8)}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.customerName} • {format(new Date(order.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rs.{order.total.toLocaleString()}</p>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

