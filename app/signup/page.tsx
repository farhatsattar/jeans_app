import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <AuthForm type="signup" />
    </section>
  );
}
