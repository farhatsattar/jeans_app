import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <AuthForm type="login" />
    </section>
  );
}
