import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { WhatYoullLearn } from "@/components/what-youll-learn";
import { HostsSection } from "@/components/hosts-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhatYoullLearn />
        <HostsSection />
      </main>
      <Footer />
    </div>
  );
}
