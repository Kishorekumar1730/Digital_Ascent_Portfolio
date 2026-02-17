import VideoBackground from "@/components/VideoBackground";
import Navigation from "@/components/Navigation";
import SectionWith3D from "@/components/SectionWith3D";
import CardGrid from "@/components/CardGrid";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";

import Partnerships from "@/components/sections/Partnerships";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="relative">
      <VideoBackground />
      <Navigation />
      <ScrollToTop />
      <SectionWith3D />
      <CardGrid />
      <Hero />
      <About />
      <Services />
      <Team />
      <Testimonials />
      <Process />

      <Partnerships />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
