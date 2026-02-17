"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroVideo from "@/assets/logo-animated.mp4"; // 🎥 Background video
import heroVideoPortrait from "@/assets/logo-animated-portrait.mp4"; // 📱 Portrait Video
import SectionWith3D from "@/components/SectionWith3D";
import CardGrid from "../CardGrid";

type Stat = { id: number; value: string; label: string };

const Hero = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState(heroVideo);

  // 🎯 Scroll to Section
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight > window.innerWidth) {
        setVideoSrc(heroVideoPortrait);
      } else {
        setVideoSrc(heroVideo);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setStats([
      { id: 1, value: "3+", label: "Projects Completed" },
      { id: 2, value: "3+", label: "Happy Clients" },
      { id: 3, value: "1+", label: "Years Experience" },
      { id: 4, value: "24/7", label: "Support" },
    ]);
    setLoading(false);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-0">
      {/* 🎥 Animated Background Video */}
      <video
        key={videoSrc} // Force re-render on source change
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* ✨ Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 backdrop-blur-[2px]" />

      {/* 🌌 Main Content */}
      <div className="container mx-auto px-4 md:px-12 relative z-10 text-center flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
        {/* Heading */}
        <CardGrid className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-4 md:mb-6 drop-shadow-lg">
          Elevate Your{" "}
          <span className="text-gradient-to-r from-orange-400 to-yellow-400">
            Digital Presence
          </span>
        </CardGrid>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 1 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4"
        >
          Transform your vision into reality with cutting-edge design, scalable
          web solutions, and strategic digital innovation.
        </motion.div>

        {/* Buttons - Aligned in single line on mobile too */}
        <SectionWith3D
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-row gap-3 md:gap-4 justify-center items-center w-full max-w-md md:max-w-none"
        >
          <Button
            onClick={() => scrollToSection("contact")}
            className="group flex-1 md:flex-none bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-400 hover:to-yellow-300 text-black font-semibold h-12 px-4 text-sm md:h-16 md:px-8 md:text-lg shadow-[0_0_30px_rgba(255,165,0,0.25)] transition-all whitespace-nowrap"
          >
            <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection("testimonials")}
            className="flex-1 md:flex-none glass-hover text-white font-semibold h-12 px-4 text-sm md:h-16 md:px-8 md:text-lg border-white/20 hover:border-orange-400/60 hover:text-orange-300 transition-all whitespace-nowrap"
          >
            View Work
          </Button>
        </SectionWith3D>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-20 max-w-lg md:max-w-4xl mx-auto w-full px-2"
        >
          {loading ? (
            <CardGrid>
              <div className="text-center text-lg py-16 animate-pulse text-gray-400">
                Loading timeline...
              </div>
            </CardGrid>
          ) : stats.length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground">
              No stats available yet
            </div>
          ) : (
            stats.map((stat) => (
              <motion.div
                key={stat.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="glass rounded-xl md:rounded-2xl p-4 md:p-6 text-center backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/10"
              >
                <div className="text-2xl md:text-4xl font-heading font-bold text-gradient mb-1 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
