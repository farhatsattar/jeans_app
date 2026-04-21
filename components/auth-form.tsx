"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthForm({ type }: { type: "login" | "signup" }) {
  const isLogin = type === "login";

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    toast.success(isLogin ? "Logged in successfully" : "Account created successfully");
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-5 rounded-xl border p-6">
      <h1 className="text-3xl font-semibold">{isLogin ? "Welcome back" : "Create account"}</h1>
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" required />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="********" required />
      </div>
      <Button className="w-full">{isLogin ? "Login" : "Signup"}</Button>
      <p className="text-sm text-muted-foreground">
        {isLogin ? "New customer?" : "Already have an account?"}{" "}
        <Link href={isLogin ? "/signup" : "/login"} className="text-foreground underline">
          {isLogin ? "Create one" : "Login"}
        </Link>
      </p>
    </form>
  );
}
