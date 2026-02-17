"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWith3D from "@/components/SectionWith3D";
import CardGrid from "../CardGrid";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type Milestone = {
  id: number;
  title: string;
  description: string;
  year: string;
  image_url?: string | null;
};

const About: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMilestones([
      {
        id: 1,
        title: "Inception",
        description: "Digital Ascent was founded with a vision to revolutionize digital experiences.",
        year: "Sep 2025",
        image_url: null,
      },
      {
        id: 2,
        title: "First Major Client",
        description: "Partnered with a leading tech firm to deliver a comprehensive rebranding.",
        year: "Oct 2025",
        image_url: null,
      },
      {
        id: 3,
        title: "Global Reach",
        description: "Expanded our services to international markets, delivering excellence worldwide.",
        year: "2026",
        image_url: null,
      },
    ]);
    setLoading(false);
  }, []);

  return (
    <section
      id="about"
      className="relative py-16 md:py-36 overflow-hidden bg-black text-white"
    >
      {/* 🌌 Animated Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08),transparent_70%)] animate-pulse-slow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/70 backdrop-blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* 🔥 Heading */}
        <div className="text-center mb-10 md:mb-16">
          <CardGrid className="text-center mb-3">
            <h2 className="text-2xl md:text-5xl font-heading font-bold mb-3 md:mb-4">
              About{" "}
              <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Digital Ascent
              </span>
            </h2>
          </CardGrid>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto px-2 leading-relaxed"
          >
            Digital Ascent is a premier digital agency dedicated to transforming businesses through innovative technology and creative design. We specialize in crafting bespoke web solutions, scalable applications, and strategic marketing campaigns that drive measurable growth.
          </motion.div>
        </div>

        {/* 🌠 Mission Card */}
        <SectionWith3D
          whileHover={{ scale: 1.03, rotateX: 6 }}
          transition={{ type: "spring", stiffness: 180, damping: 15 }}
          className="max-w-4xl mx-auto mb-16 md:mb-24 glass rounded-2xl md:rounded-3xl p-6 md:p-14 text-center shadow-[0_10px_40px_rgba(255,140,0,0.1)] border border-white/5"
        >
          <h2 className="text-xl md:text-5xl font-heading font-bold mb-3 md:mb-4">
            Our{" "}
            <span className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
          <p className="text-sm md:text-lg leading-relaxed text-gray-300">
            Empowering businesses with innovative digital solutions that create
            lasting impact and elevate every brand to new heights.
          </p>
        </SectionWith3D>

        {/* 🕓 Timeline */}
        <div className="mb-16 md:mb-28">
          <CardGrid className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-heading font-bold mb-2 md:mb-4">
              Our{" "}
              <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
          </CardGrid>

          {loading ? (
            <div className="text-center text-lg py-16 animate-pulse text-gray-400">
              Loading timeline...
            </div>
          ) : milestones.length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground">
              No milestones added yet
            </div>
          ) : (
            <div className="relative max-w-7xl mx-auto px-2 md:px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 2000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent className="-ml-0">
                  {milestones.map((m) => (
                    <CarouselItem
                      key={m.id}
                      className="basis-full md:basis-1/2 lg:basis-1/3 pl-0 relative pt-6 pb-8 md:pt-10 md:pb-12"
                    >
                      <div className="relative flex flex-col items-center group touch-none select-none">
                        {/* 🔗 Horizontal Chain Line - Hidden on Mobile for cleaner look? Keeping simple */}
                        <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-gray-800 -z-10 group-hover:bg-orange-900/40 transition-colors duration-500 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        </div>

                        {/* 📍 Node / Year Badge */}
                        <div className="h-8 md:h-12 w-auto min-w-[2.5rem] md:min-w-[3rem] px-3 md:px-4 rounded-full bg-black border border-gray-700 group-hover:border-orange-500 flex items-center justify-center relative z-10 shadow-lg group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300 transform group-hover:scale-110 mb-3 md:mb-0">
                          <span className="text-[10px] md:text-xs font-bold text-gray-400 group-hover:text-orange-400 transition-colors whitespace-nowrap">
                            {m.year}
                          </span>
                        </div>

                        {/* ⛓ Vertical Connector - Desktop Only */}
                        <div className="hidden md:block h-8 w-[2px] bg-gradient-to-b from-gray-700 to-transparent group-hover:from-orange-500/50 transition-colors duration-300" />

                        {/* 🃏 Content Card */}
                        <div className="w-full max-w-xs md:max-w-sm relative px-2 md:px-4">
                          <motion.div
                            whileHover={{ y: -5 }}
                            className="glass p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/5 bg-black/40 hover:bg-zinc-900/60 transition-all duration-300 text-center relative overflow-hidden group/card"
                          >
                            <h3 className="relative z-10 text-lg md:text-xl font-heading font-bold text-white mb-1 md:mb-2 group-hover/card:text-orange-400 transition-colors">
                              {m.title}
                            </h3>
                            <p className="relative z-10 text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none">
                              {m.description}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-4 bg-black/50 border-white/10 hover:bg-orange-500 hover:border-orange-500 text-white" />
                <CarouselNext className="hidden md:flex -right-4 bg-black/50 border-white/10 hover:bg-orange-500 hover:border-orange-500 text-white" />
              </Carousel>
            </div>
          )}
        </div>

        {/* 💎 Core Values */}
        <div>
          <CardGrid className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-heading font-bold mb-3 md:mb-4">
              Our{" "}
              <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Core Values
              </span>
            </h2>
          </CardGrid>

          <CardGrid className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {[
              {
                title: "Innovation",
                desc: "We push boundaries with tech.",
              },
              {
                title: "Results",
                desc: "Impact driven focus.",
              },
              {
                title: "Partnership",
                desc: "Extension of your team.",
              },
              {
                title: "Excellence",
                desc: "Details matter always.",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="glass-hover rounded-xl p-4 md:p-8 text-center group backdrop-blur-xl shadow-[0_10px_30px_rgba(255,140,0,0.05)] border border-white/5"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full bg-orange-500/10 border border-orange-400/20 mb-3 md:mb-5 group-hover:bg-orange-500/20 transition-all">
                  <div className="text-lg md:text-2xl font-heading text-orange-400">
                    {v.title[0]}
                  </div>
                </div>
                <h4 className="text-sm md:text-xl font-heading font-semibold mb-1 md:mb-3 text-white">
                  {v.title}
                </h4>
                <p className="text-[10px] md:text-base text-gray-400 leading-tight md:leading-normal">{v.desc}</p>
              </motion.div>
            ))}
          </CardGrid>
        </div>
      </div>
    </section>
  );
};

export default About;
