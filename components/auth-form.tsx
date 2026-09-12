"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  signUpCustomer,
  loginUser,
} from "@/lib/firebase/auth";

export function AuthForm({
  type,
}: {
  type: "login" | "signup";
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isLogin = type === "login";

  const onSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      if (isLogin) {
        // Admin + Customer dono yahan se login karenge
        const result = await loginUser(email, password);

        if (result.error) {
          toast.error(result.error);
          return;
        }

        // Admin → Admin Dashboard
        if (result.role === "admin") {
          toast.success("Welcome back, Admin!");
          router.push("/admin");
          return;
        }

        // Customer → Storefront
        if (result.role === "customer") {
          toast.success("Logged in successfully!");
          router.push("/");
          return;
        }

        toast.error("Account type could not be determined.");
        return;
      }

      // Customer Signup
      const result = await signUpCustomer(
        email,
        password,
        name
      );

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Account created successfully!");
      router.push("/");
    } catch (error) {
      console.error(
        "Authentication error:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-md space-y-5 rounded-xl border p-6"
    >
      <h1 className="text-3xl font-semibold">
        {isLogin
          ? "Welcome back"
          : "Create account"}
      </h1>

      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="name">
            Full Name
          </Label>

          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">
          Email
        </Label>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          Password
        </Label>

        <Input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          required
          minLength={6}
        />
      </div>

      <Button
        className="w-full"
        type="submit"
        disabled={isLoading}
      >
        {isLoading
          ? "Please wait..."
          : isLogin
            ? "Login"
            : "Signup"}
      </Button>

      <p className="text-sm text-muted-foreground">
        {isLogin
          ? "New customer?"
          : "Already have an account?"}{" "}

        <Link
          href={
            isLogin
              ? "/signup"
              : "/login"
          }
          className="text-foreground underline"
        >
          {isLogin
            ? "Create one"
            : "Login"}
        </Link>
      </p>
    </form>
  );
}