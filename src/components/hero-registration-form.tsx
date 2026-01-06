"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  consent: z.literal(true, { error: "You must agree to be contacted" }),
});

type FormData = z.infer<typeof formSchema>;

export function HeroRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      consent: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-accent bg-background-alt p-6 shadow-2xl sm:p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <svg
              className="h-8 w-8 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-text-primary">
            You&apos;re Registered!
          </h3>
          <p className="mb-4 text-sm text-text-secondary">
            Thank you for signing up for Home Buying 101!
          </p>
          <p className="text-xs text-text-secondary">
            We&apos;ll send you the Zoom link before the webinar on January
            29th.
          </p>
          <div className="mt-4 rounded-lg bg-background p-3">
            <p className="text-xs text-text-secondary">
              Questions? Contact{" "}
              <a
                href="tel:417-705-5923"
                className="text-accent hover:underline"
              >
                417-705-5923
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-background-alt p-6 shadow-2xl sm:p-8">
      <div className="mb-6 text-center">
        <h2 className="mb-1 text-xl font-bold text-text-primary sm:text-2xl">
          Reserve Your Spot
        </h2>
        <p className="text-sm text-accent font-medium">
          Limited seats available!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label
            htmlFor="hero-name"
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            id="hero-name"
            placeholder="John Doe"
            className={cn(
              "w-full rounded-lg border bg-background px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
              errors.name ? "border-red-500" : "border-border"
            )}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="hero-email"
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            id="hero-email"
            placeholder="john@example.com"
            className={cn(
              "w-full rounded-lg border bg-background px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
              errors.email ? "border-red-500" : "border-border"
            )}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="hero-phone"
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            {...register("phone")}
            type="tel"
            id="hero-phone"
            placeholder="(555) 123-4567"
            className={cn(
              "w-full rounded-lg border bg-background px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
              errors.phone ? "border-red-500" : "border-border"
            )}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div>
          <label className="flex cursor-pointer items-start gap-2">
            <input
              {...register("consent")}
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-border bg-background accent-accent focus:ring-accent"
            />
            <span className="text-xs text-text-secondary">
              I agree to be contacted about this webinar and future real estate
              updates <span className="text-accent">*</span>
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-xs text-red-500">
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red-500/10 p-3 text-center">
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-accent px-6 py-3 text-base font-semibold text-background transition-all hover:bg-accent-hover hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-alt disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Registering...
            </span>
          ) : (
            "Reserve My Spot"
          )}
        </button>
      </form>
    </div>
  );
}
