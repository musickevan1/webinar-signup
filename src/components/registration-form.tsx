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

export function RegistrationForm() {
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
      <section
        id="register"
        className="bg-background-alt px-4 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-xl">
          <div className="rounded-xl border border-accent bg-accent/10 p-8 text-center">
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
            <h3 className="mb-2 text-2xl font-bold text-text-primary">
              You&apos;re Registered!
            </h3>
            <p className="mb-4 text-text-secondary">
              Thank you for signing up for Home Buying 101!
            </p>
            <p className="text-sm text-text-secondary">
              We&apos;ll send you the Zoom link and reminder email before the
              webinar on January 29th.
            </p>
            <div className="mt-6 rounded-lg bg-background p-4">
              <p className="text-sm text-text-secondary">
                Questions? Contact Tim at{" "}
                <a
                  href="tel:417-705-5923"
                  className="text-accent hover:underline"
                >
                  417-705-5923
                </a>{" "}
                or{" "}
                <a
                  href="mailto:tim.lambertrealty@gmail.com"
                  className="text-accent hover:underline"
                >
                  tim.lambertrealty@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="bg-background-alt px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-text-primary sm:text-4xl">
            Reserve Your Spot
          </h2>
          <p className="text-text-secondary">
            Limited seats available – Register now!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-xl border border-border bg-background p-6 sm:p-8"
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              Full Name <span className="text-accent">*</span>
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              placeholder="John Doe"
              className={cn(
                "w-full rounded-lg border bg-background-alt px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
                errors.name ? "border-red-500" : "border-border"
              )}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              Email Address <span className="text-accent">*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="john@example.com"
              className={cn(
                "w-full rounded-lg border bg-background-alt px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
                errors.email ? "border-red-500" : "border-border"
              )}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              Phone Number <span className="text-accent">*</span>
            </label>
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              placeholder="(555) 123-4567"
              className={cn(
                "w-full rounded-lg border bg-background-alt px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
                errors.phone ? "border-red-500" : "border-border"
              )}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                {...register("consent")}
                type="checkbox"
                className="mt-1 h-5 w-5 rounded border-border bg-background-alt accent-accent focus:ring-accent"
              />
              <span className="text-sm text-text-secondary">
                I agree to be contacted about this webinar and future real
                estate updates <span className="text-accent">*</span>
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1 text-sm text-red-500">
                {errors.consent.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-500/10 p-4 text-center">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-accent px-6 py-4 text-lg font-semibold text-background transition-colors hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
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
    </section>
  );
}
