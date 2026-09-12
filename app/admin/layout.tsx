"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import {
  onAuthChange,
  checkIsAdmin,
  logoutAdmin,
} from "@/lib/firebase/auth";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  const [loading, setLoading] = useState(!isLoginPage);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Admin login page doesn't need authentication check
    if (isLoginPage) {
      setLoading(false);
      setIsAdmin(false);
      return;
    }

    // Start authentication check
    setLoading(true);

    console.log("🔐 Checking admin authentication...");

    const unsubscribe = onAuthChange(async (user) => {
      console.log("🔥 Firebase Auth User:", user);

      try {
        // --------------------------------
        // No Firebase user
        // --------------------------------
        if (!user) {
          console.log("❌ No Firebase user found");

          setIsAdmin(false);
          setLoading(false);

          router.replace("/login");
          return;
        }

        console.log("✅ Firebase user found");
        console.log("🆔 UID:", user.uid);
        console.log("📧 Email:", user.email);

        // --------------------------------
        // Check admin role in Firestore
        // --------------------------------
        console.log("🔎 Checking Firestore admin document...");

        const admin = await checkIsAdmin(user.uid);

        console.log("👑 Is Admin:", admin);

        // --------------------------------
        // User is NOT admin
        // --------------------------------
        if (!admin) {
          console.log("❌ User is NOT an admin");

          setIsAdmin(false);
          setLoading(false);

          await logoutAdmin();

          router.replace("/admin/login");
          return;
        }

        // --------------------------------
        // User IS admin
        // --------------------------------
        console.log("✅ ADMIN AUTHORIZED");
        console.log("🚀 Opening admin dashboard...");

        setIsAdmin(true);
        setLoading(false);
      } catch (error) {
        console.error(
          "🔥 ADMIN AUTHORIZATION ERROR:",
          error
        );

        setIsAdmin(false);
        setLoading(false);

        router.replace("/admin/login");
      }
    });

    return () => {
      console.log("🧹 Removing auth listener");
      unsubscribe();
    };
  }, [isLoginPage, router]);

  // --------------------------------
  // Admin Login Page
  // --------------------------------
  if (isLoginPage) {
    return <>{children}</>;
  }

  // --------------------------------
  // Authentication Loading
  // --------------------------------
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // --------------------------------
  // Unauthorized
  // --------------------------------
  if (!isAdmin) {
    return null;
  }

  // --------------------------------
  // Authorized Admin Dashboard
  // --------------------------------
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

