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
  loginWithGoogle,
} from "@/lib/firebase/auth";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function AuthForm({
  type,
}: {
  type: "login" | "signup";
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isLogin = type === "login";

  const redirectAfterAuth = (role: "admin" | "customer") => {
    if (role === "admin") {
      toast.success("Welcome back, Admin!");
      router.push("/admin");
      return;
    }

    toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");
    router.push("/");
  };

  const onGoogleClick = async () => {
    setIsGoogleLoading(true);

    try {
      const result = await loginWithGoogle();

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.role === "admin" || result.role === "customer") {
        redirectAfterAuth(result.role);
        return;
      }

      toast.error("Account type could not be determined.");
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

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
        const result = await loginUser(email, password);

        if (result.error) {
          toast.error(result.error);
          return;
        }

        if (result.role === "admin" || result.role === "customer") {
          redirectAfterAuth(result.role);
          return;
        }

        toast.error("Account type could not be determined.");
        return;
      }

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

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onGoogleClick}
        disabled={isLoading || isGoogleLoading}
      >
        <GoogleIcon className="mr-2 size-5" />
        {isGoogleLoading
          ? "Connecting..."
          : isLogin
            ? "Continue with Google"
            : "Sign up with Google"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

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
        disabled={isLoading || isGoogleLoading}
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
