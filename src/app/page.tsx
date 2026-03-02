import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import ServicesBento from "@/components/ServicesBento";
import CaseStudies from "@/components/frontend/CaseStudies";
import Testimonials from "@/components/frontend/Testimonials";
import ContactFaq from "@/components/ContactFaq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <ServicesBento />
      <CaseStudies />
      <Testimonials />
      <ContactFaq />
      <Footer />
    </main>
  );
}
