"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [status, setStatus] = useState<"countdown" | "live" | "ended">(
    "countdown"
  );

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const webinarEnd = target + 60 * 60 * 1000; // 1 hour after start

      if (now >= webinarEnd) {
        setStatus("ended");
        return null;
      }

      if (now >= target) {
        setStatus("live");
        return null;
      }

      const difference = target - now;

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (status === "ended") {
    return (
      <div className="rounded-lg border border-border bg-background-alt p-4">
        <p className="text-sm font-medium text-text-secondary">
          This webinar has ended. Stay tuned for future events!
        </p>
      </div>
    );
  }

  if (status === "live") {
    return (
      <div className="rounded-lg border border-accent bg-accent/10 p-4">
        <div className="flex items-center justify-center lg:justify-start gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
          <p className="text-base font-bold text-accent">
            The Webinar is Live Now!
          </p>
        </div>
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className="rounded-lg border border-border bg-background-alt p-4">
        <p className="text-sm text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background-alt p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-secondary text-center lg:text-left">
        Webinar Starts In
      </p>
      <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-4">
        <TimeUnit value={timeLeft.days} label="Days" />
        <Separator />
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <Separator />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <Separator />
        <TimeUnit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold text-accent sm:text-3xl">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] text-text-secondary sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-xl font-bold text-text-secondary sm:text-2xl">
      :
    </span>
  );
}
