import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import logoAnimated from '@/assets/logo-animated.png';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img
          src={logoAnimated}
          alt=""
          className="w-[80%] h-[80%] object-contain animate-[spin_60s_linear_infinite]"
          style={{ animationDirection: 'reverse' }}
        />
      </div>
      
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Logo Animation */}
        <div className="mb-8 flex justify-center animate-float">
          <div className="relative">
            <img
              src={logo}
              alt="Digital Ascent"
              className="h-32 w-32 md:h-48 md:w-48 animate-glow"
            />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-fade-in">
          Elevate Your
          <span className="block text-gradient mt-2">Digital Presence</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
          Transform your vision into reality with cutting-edge web solutions, 
          stunning design, and strategic digital innovation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="group bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg px-8 py-6 glow-border"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('portfolio')}
            className="glass-hover font-heading text-lg px-8 py-6 border-primary/50"
          >
            View Our Work
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          {[
            { value: '500+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '50+', label: 'Industry Awards' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div key={index} className="glass rounded-lg p-6 text-center animate-fade-in hover:scale-105 transition-transform">
              <div className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;