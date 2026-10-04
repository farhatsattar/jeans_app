import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <AuthForm type="login" />

        <div className="mt-6 rounded-xl border p-6 text-center">
          <h2 className="text-lg font-semibold">New here?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create an account to shop our premium Pakistani stitched collection.
          </p>
          <Link
            href="/signup"
            className="mt-4 inline-block rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-black/90 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}