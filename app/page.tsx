import { ScrollScenes } from "@/components/motion/ScrollScenes";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Integrations } from "@/components/sections/Integrations";
import { Modules } from "@/components/sections/Modules";
import { Pricing } from "@/components/sections/Pricing";
import { Showcases } from "@/components/sections/Showcases";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhatsappFab } from "@/components/sections/WhatsappFab";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClientsMarquee />
        <Modules />
        <Showcases />
        <HowItWorks />
        <Pricing />
        <Integrations />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsappFab />
      <ScrollScenes />
    </>
  );
}
