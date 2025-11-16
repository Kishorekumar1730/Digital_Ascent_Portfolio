"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  FileSearch,
  Palette,
  Code,
  TestTube,
  Rocket,
} from "lucide-react";
import SectionWith3D from "../SectionWith3D";
import CardGrid from "../CardGrid";

const Process = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: "Discovery & Strategy",
      description:
        "We start by understanding your business goals, target audience, and project requirements through in-depth consultation.",
    },
    {
      icon: FileSearch,
      title: "Research & Planning",
      description:
        "Comprehensive market research and competitive analysis to inform our strategic approach and project roadmap.",
    },
    {
      icon: Palette,
      title: "Design & Prototyping",
      description:
        "Creating wireframes, mockups, and interactive prototypes that bring your vision to life with stunning visuals.",
    },
    {
      icon: Code,
      title: "Development",
      description:
        "Building your solution with clean, scalable code and cutting-edge technologies for optimal performance.",
    },
    {
      icon: TestTube,
      title: "Testing & QA",
      description:
        "Rigorous testing across devices and browsers to ensure flawless functionality and user experience.",
    },
    {
      icon: Rocket,
      title: "Launch & Support",
      description:
        "Smooth deployment and ongoing support to ensure your digital solution continues to excel and evolve.",
    },
  ];

  return (
    <section
      id="process"
      className="relative py-24 md:py-36 overflow-hidden bg-black text-white"
    >
      {/* 🔥 Background Layers for Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08),transparent_70%)] animate-pulse-slow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80 backdrop-blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <CardGrid className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Our{" "}
            <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results every time.
          </p>
        </CardGrid>

        {/* Process Steps */}
        <CardGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <SectionWith3D
                whileHover={{ rotateX: 4, rotateY: -3, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
                className="relative glass-hover rounded-3xl p-8 md:p-10 backdrop-blur-xl border border-orange-400/10 shadow-[0_10px_60px_rgba(255,140,0,0.1)] h-full flex flex-col justify-between"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center font-heading font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent backdrop-blur-md shadow-[0_0_40px_rgba(255,140,0,0.2)]">
                  {i + 1}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-orange-500/10 border border-orange-400/20">
                    <step.icon className="w-10 h-10 text-orange-400" />
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-center mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-gray-300 text-sm text-center leading-relaxed">
                  {step.description}
                </p>
              </SectionWith3D>
            </motion.div>
          ))}
        </CardGrid>

        {/* CTA Section */}
        <CardGrid className="glass rounded-3xl p-10 md:p-14 mt-20 text-center max-w-3xl mx-auto border border-orange-400/10 shadow-[0_10px_60px_rgba(255,140,0,0.1)] backdrop-blur-xl">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-gray-400 mb-6">
            Let’s discuss how our proven process can bring your vision to life.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-heading font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent border border-orange-400/50 hover:bg-orange-500/10 transition-all backdrop-blur-md"
          >
            Schedule a Consultation
          </motion.button>
        </CardGrid>
      </div>
    </section>
  );
};

export default Process;
