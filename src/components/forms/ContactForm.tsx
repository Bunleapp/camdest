"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormInput } from "@/lib/validation";
import { submitContactForm } from "@/services/destinationService";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormInput) {
    setSubmitState("submitting");
    setServerMessage(null);

    try {
      const result = await submitContactForm(data);
      setSubmitState("success");
      setServerMessage(result.message);
      reset();
    } catch (err) {
      setSubmitState("error");
      setServerMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
      aria-busy={submitState === "submitting"}
    >
      <p className="text-xs text-muted">
        Fields marked <span aria-hidden="true" className="text-red-500">*</span> are required.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Name"
          placeholder="Your full name"
          required
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Phone"
          type="tel"
          placeholder="+855 12 345 678"
          required
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Subject"
          placeholder="What is this about?"
          required
          error={errors.subject?.message}
          {...register("subject")}
        />
      </div>

      <Textarea
        label="Message"
        rows={5}
        placeholder="Tell us how we can help..."
        required
        error={errors.message?.message}
        {...register("message")}
      />

      {submitState === "success" && serverMessage && (
        <p role="status" className="rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary-dark">
          {serverMessage}
        </p>
      )}

      {submitState === "error" && serverMessage && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {serverMessage}
        </p>
      )}

      <Button type="submit" disabled={submitState === "submitting"} className="w-full sm:w-auto">
        {submitState === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
