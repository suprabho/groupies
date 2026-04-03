import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/homepage/Hero";
import Manifesto from "@/components/homepage/Manifesto";
import HowItWorks from "@/components/homepage/HowItWorks";
import ArtistFeatures from "@/components/homepage/ArtistFeatures";
import Pricing from "@/components/homepage/Pricing";
import Roadmap from "@/components/homepage/Roadmap";
import ArtistCTA from "@/components/homepage/ArtistCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <Manifesto />
        <HowItWorks />
        <ArtistFeatures />
        <Pricing />
        <Roadmap />
        <ArtistCTA />
      </main>
      <Footer />
    </>
  );
}
