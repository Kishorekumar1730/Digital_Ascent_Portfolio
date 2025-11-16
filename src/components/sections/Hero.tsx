"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import heroVideo from "@/assets/logo-animated.mp4"; // 🎥 Background video
import SectionWith3D from "@/components/SectionWith3D";
import CardGrid from "../CardGrid";

type Stat = { id: number; value: string; label: string };

const Hero = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  // 🎯 Scroll to Section
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // 🚀 Fetch Stats from Supabase
  const fetchStats = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hero_stats")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching hero stats:", error);
    } else {
      setStats(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();

    // 🧩 Optional realtime updates
    const subscription = supabase
      .channel("public:hero_stats")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "hero_stats" },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 🎥 Animated Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* ✨ Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 backdrop-blur-[2px]" />

      {/* 🌌 Main Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center justify-center min-h-screen">
        {/* Heading */}
        <CardGrid className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 drop-shadow-lg">
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
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Transform your vision into reality with cutting-edge design, scalable
          web solutions, and strategic digital innovation.
        </motion.div>

        {/* Buttons */}
        <SectionWith3D
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("contact")}
            className="group bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-400 hover:to-yellow-300 text-black font-semibold px-8 py-6 text-lg shadow-[0_0_30px_rgba(255,165,0,0.25)] transition-all"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("testimonials")}
            className="glass-hover text-white font-semibold px-8 py-6 text-lg border-white/20 hover:border-orange-400/60 hover:text-orange-300 transition-all"
          >
            View Our Work
          </Button>
        </SectionWith3D>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
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
                className="glass rounded-2xl p-6 text-center backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/10"
              >
                <div className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
