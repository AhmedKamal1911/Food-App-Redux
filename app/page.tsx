import HeroSection from "./_components/sections/hero-section";
import IntroSection from "./_components/sections/intro-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IntroSection />
    </main>
  );
}
