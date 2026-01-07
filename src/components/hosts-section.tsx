import Image from "next/image";

export function HostsSection() {
  return (
    <section className="bg-background px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-text-primary sm:text-4xl">
          Meet Your Hosts
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-text-secondary">
          Learn from experienced professionals who will guide you through every
          step of your home buying journey.
        </p>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* Tim Lambert */}
          <div className="group relative overflow-hidden rounded-xl border border-border bg-background-alt p-6 text-center transition-all hover:border-accent/50">
            {/* Decorative corner */}
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-accent/10 transition-transform group-hover:scale-150" />

            {/* Avatar */}
            <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-accent">
              <Image
                src="/images/tim.jpeg"
                alt="Tim Lambert"
                fill
                className="object-cover object-[center_20%] scale-125"
              />
            </div>

            {/* Name */}
            <h3 className="mb-1 text-xl font-semibold text-text-primary">
              Tim Lambert
            </h3>

            {/* Title */}
            <p className="mb-3 text-accent">Broker Salesperson</p>

            {/* Company Logo */}
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/images/cropped-xzackt-logo.png"
                alt="XZACKT Real Estate Group"
                width={180}
                height={50}
                className="h-12 w-auto object-contain brightness-0 invert opacity-70"
              />
            </div>
          </div>

          {/* Dustin Sullins */}
          <div className="group relative overflow-hidden rounded-xl border border-border bg-background-alt p-6 text-center transition-all hover:border-accent/50">
            {/* Decorative corner */}
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-accent/10 transition-transform group-hover:scale-150" />

            {/* Avatar */}
            <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-accent">
              <Image
                src="/images/dustin.jpeg"
                alt="Dustin Sullins"
                fill
                className="object-cover object-top scale-[1.75]"
              />
            </div>

            {/* Name */}
            <h3 className="mb-1 text-xl font-semibold text-text-primary">
              Dustin Sullins
            </h3>

            {/* Title */}
            <p className="mb-1 text-accent">Mortgage Broker</p>
            <p className="mb-3 text-xs text-text-secondary">NMLS #2070053</p>

            {/* Company Logo */}
            <div className="flex items-center justify-center">
              <Image
                src="/images/dustin-sullins-logo.png"
                alt="CrossCountry Mortgage"
                width={220}
                height={50}
                className="h-12 w-auto object-contain brightness-0 invert opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
