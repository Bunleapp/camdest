"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { adminLoginSchema, type AdminLoginInput } from "@/lib/validation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type SubmitState = "idle" | "submitting" | "error";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
  });

  async function onSubmit(data: AdminLoginInput) {
    setSubmitState("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setSubmitState("error");
        setErrorMessage(
          response.status === 429
            ? "Too many login attempts. Please try again later."
            : body?.error ?? "Invalid credentials."
        );
        return;
      }

      const destination = searchParams.get("from") ?? "/admin/dashboard";
      router.push(destination);
      router.refresh();
    } catch {
      setSubmitState("error");
      setErrorMessage("Unable to sign in. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
      aria-busy={submitState === "submitting"}
    >
      <Input
        label="Email"
        type="email"
        autoComplete="username"
        required
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        error={errors.password?.message}
        {...register("password")}
      />

      {submitState === "error" && errorMessage && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        disabled={submitState === "submitting"}
        className="w-full"
      >
        {submitState === "submitting" ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}

/**
 * /admin/login
 *
 * Standalone page — deliberately outside the (protected) route group,
 * so it does NOT render the AdminShell sidebar (which would be
 * meaningless before authentication). Also outside the public
 * `(site)` route group, so it does not render the visitor
 * Navbar/Footer either.
 *
 * There is no public link to this page anywhere in the visitor-facing
 * UI (see Phase 8 isolation check) — it is reached only by navigating
 * to the URL directly.
 */
export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-xl font-bold text-slate-900">Admin Sign In</h1>
        <p className="mt-1 text-sm text-slate-500">
          Sign in to manage destination content.
        </p>

        <div className="mt-6">
          <Suspense fallback={null}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
