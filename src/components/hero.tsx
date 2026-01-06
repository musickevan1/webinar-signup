import { CountdownTimer } from "./countdown-timer";
import { HeroRegistrationForm } from "./hero-registration-form";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-12 sm:py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="text-sm font-medium text-accent">
                Free Live Webinar
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Welcome to{" "}
              <span className="text-accent">Home Buying 101</span>
            </h1>

            {/* Subtitle */}
            <p className="mb-6 text-base text-text-secondary sm:text-lg">
              Your complete guide from pre-approval to the closing table. Join Tim
              Lambert and Dustin Sullins for an informative session on
              everything you need to know about buying your first home!
            </p>

            {/* Event Details */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <div className="flex items-center gap-2 rounded-lg bg-background-alt px-3 py-2">
                <svg
                  className="h-4 w-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-text-primary">
                  Jan 29th, 2026
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-background-alt px-3 py-2">
                <svg
                  className="h-4 w-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium text-text-primary">
                  6:00 - 7:00 PM CT
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-background-alt px-3 py-2">
                <svg
                  className="h-4 w-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-text-primary">
                  Live on Zoom
                </span>
              </div>
            </div>

            {/* Countdown Timer */}
            <CountdownTimer targetDate="2026-01-30T00:00:00.000Z" />
          </div>

          {/* Right side - Registration Form */}
          <div className="flex justify-center lg:justify-end">
            <HeroRegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
