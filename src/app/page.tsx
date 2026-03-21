import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutIntro from "@/components/AboutIntro";
import LogoMarquee from "@/components/LogoMarquee";
import CaseStudies from "@/components/frontend/CaseStudies";
import Manifesto from "@/components/Manifesto";
import ServicesBento from "@/components/ServicesBento";
import Testimonials from "@/components/frontend/Testimonials";
import ContactFaq from "@/components/ContactFaq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutIntro />
      <LogoMarquee />
      <CaseStudies />
      <Manifesto />
      <ServicesBento />
      <Testimonials />
      <ContactFaq />
      <Footer />
    </main>
  );
}
