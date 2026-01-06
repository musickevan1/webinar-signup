import Image from "next/image";

export function Header() {
  return (
    <header className="w-full border-b border-border bg-background py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4 sm:gap-8">
        {/* ZACKT Logo */}
        <div className="flex items-center">
          <Image
            src="/images/cropped-xzackt-logo.png"
            alt="ZACKT Real Estate Group"
            width={140}
            height={60}
            className="h-12 w-auto object-contain brightness-0 invert sm:h-14"
            priority
          />
        </div>

        {/* X Separator */}
        <span className="font-calgary text-2xl text-text-secondary">x</span>

        {/* Realty ONE Group Grand Logo */}
        <div className="flex items-center">
          <Image
            src="/images/grand-logotype.png"
            alt="Realty ONE Group Grand"
            width={200}
            height={50}
            className="h-10 w-auto object-contain sm:h-12"
            priority
          />
        </div>
      </div>
    </header>
  );
}
