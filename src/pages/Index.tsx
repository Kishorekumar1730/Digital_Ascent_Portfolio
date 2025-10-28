import VideoBackground from '@/components/VideoBackground';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import VideoSection from '@/components/sections/VideoSection';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Process from '@/components/sections/Process';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';

const Index = () => {
  return (
    <div className="relative">
      <VideoBackground />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <VideoSection />
      <Portfolio />
      <Testimonials />
      <Process />
      <Pricing />
      <Contact />
    </div>
  );
};

export default Index;