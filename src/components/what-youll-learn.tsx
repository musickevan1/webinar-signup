const learningPoints = [
  "Understanding the home buying process from start to finish",
  "How to get pre-approved and why it matters",
  "Available loan programs and which one is right for you",
  "Expert lending advice to maximize your buying power",
  "What to expect from pre-approval to closing table",
];

export function WhatYoullLearn() {
  return (
    <section className="bg-background-alt px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-text-primary sm:text-4xl">
          What You&apos;ll Learn
        </h2>

        <div className="grid gap-4 sm:gap-6">
          {learningPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border border-border bg-background p-4 transition-colors hover:border-accent/50 sm:p-6"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent/20">
                <svg
                  className="h-5 w-5 text-accent"
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
              <p className="text-base text-text-primary sm:text-lg">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
