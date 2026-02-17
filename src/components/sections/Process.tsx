import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  FileSearch,
  Palette,
  Code,
  TestTube,
  Rocket,
  X,
} from "lucide-react";
import SectionWith3D from "../SectionWith3D";
import CardGrid from "../CardGrid";

const Process = () => {
  const [selectedStep, setSelectedStep] = useState<any>(null);

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
      className="relative py-16 md:py-36 overflow-hidden bg-black text-white"
    >
      {/* 🔥 Background Layers for Glow */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08),transparent_70%)] animate-pulse-slow pointer-events-none transition-all duration-300 ${selectedStep ? "blur-sm" : ""}`} />
      <div className={`absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80 backdrop-blur-3xl pointer-events-none transition-all duration-300 ${selectedStep ? "blur-sm" : ""}`} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Heading */}
        <CardGrid className={`text-center mb-10 md:mb-16 transition-all duration-300 ${selectedStep ? "blur-md" : ""}`}>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Our{" "}
            <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results every time.
          </p>
        </CardGrid>

        {/* DESKTOP VIEW - Unchanged Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
        </div>

        {/* MOBILE VIEW - Compact 2x2 Grid */}
        <div className={`md:hidden grid grid-cols-2 gap-3 transition-all duration-300 ${selectedStep ? "blur-md pointer-events-none" : ""}`}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setSelectedStep({ ...step, number: i + 1 })}
            >
              <div className="relative bg-zinc-900/60 border border-white/10 rounded-2xl p-4 h-full flex flex-col items-center justify-center text-center backdrop-blur-md active:scale-95 transition-transform">
                {/* Number Badge (Small) */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[10px] font-bold text-orange-400">
                  {i + 1}
                </div>

                {/* Icon (Compact) */}
                <div className="w-12 h-12 rounded-xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-center mb-3">
                  <step.icon className="w-6 h-6 text-orange-400" />
                </div>

                {/* Title (Compact) */}
                <h3 className="text-xs font-bold text-gray-200 leading-tight">
                  {step.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Details Modal */}
        <AnimatePresence>
          {selectedStep && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden"
            >
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={() => setSelectedStep(null)}
              />

              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-zinc-900 border border-orange-500/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedStep(null)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Number Badge Large */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-orange-500/10 -mt-10 -ml-10 rounded-br-full flex items-end justify-end p-4">
                  <span className="text-2xl font-bold text-orange-500 opacity-50">
                    {selectedStep.number.toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center mt-4">
                  <div className="w-20 h-20 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-400/20 shadow-lg shadow-orange-500/5">
                    <selectedStep.icon className="text-orange-400 w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                    {selectedStep.title}
                  </h3>

                  <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mb-6 opacity-50" />

                  <p className="text-gray-300 leading-relaxed text-sm">
                    {selectedStep.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


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
