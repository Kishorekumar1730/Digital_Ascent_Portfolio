"use client";


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Palette,
  Rocket,
  BarChart3,
  Smartphone,
  Cloud,
  LucideIcon,
  X,
} from "lucide-react";
import CardGrid from "../CardGrid";
import SectionWith3D from "../SectionWith3D";

type Service = {
  key: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  comingSoon?: boolean;
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      key: "Web Application",
      icon: Code2,
      title: "Web Application",
      description:
        "High-performance websites and full-stack web apps engineered for scalability and sleek design.",
      features: [
        "Next.js / React",
        "REST & GraphQL APIs",
        "E-commerce & CMS",
        "PWAs & SSR Optimization",
      ],
    },
    {
      key: "UI/UX Design",
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Crafting interfaces that blend creativity with seamless user experiences.",
      features: [
        "Wireframes & Prototypes",
        "User Flows & Persona Mapping",
        "Design Systems",
        "Accessibility First",
      ],
      comingSoon: true,
    },
    {
      key: "Digital Strategy",
      icon: Rocket,
      title: "Digital Strategy",
      description:
        "Guiding brands to achieve measurable growth through data-driven strategy and innovation.",
      features: [
        "Market Positioning",
        "Brand Growth Plan",
        "User Insights",
        "Campaign Optimization",
      ],
    },
    {
      key: "SEO & Marketing",
      icon: BarChart3,
      title: "SEO & Marketing",
      description:
        "Boost visibility, engagement, and ROI with optimized content and digital marketing.",
      features: [
        "SEO Optimization",
        "Content Strategy",
        "Social Media Reach",
        "Performance Metrics",
      ],
      comingSoon: true,
    },
    {
      key: "Mobile Applications",
      icon: Smartphone,
      title: "Mobile Applications",
      description:
        "Cross-platform mobile experiences crafted for fluid performance and elegant UI.",
      features: [
        "React Native / Expo",
        "Store Deployment",
        "In-App Analytics",
        "Push Notifications",
      ],
    },
    {
      key: "Cloud & DevOps",
      icon: Cloud,
      title: "Cloud & DevOps",
      description:
        "Deploy, automate, and scale efficiently with reliable cloud and CI/CD solutions.",
      features: [
        "AWS / Vercel / Render",
        "CI/CD Setup",
        "Monitoring & Alerts",
        "Security Hardening",
      ],
      comingSoon: true,
    },
  ];

  return (
    <section id="services" className="relative py-16 md:py-32 overflow-hidden">
      {/* 🔥 Ambient background */}
      <div className={`absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/95 transition-all duration-300 ${selectedService ? "blur-sm" : ""}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.06),transparent_70%)] opacity-70 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-center mb-10 md:mb-16 transition-all duration-300 ${selectedService ? "blur-md" : ""}`}
        >
          <CardGrid className="text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Our{" "}
              <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
          </CardGrid>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
            We blend creativity, technology, and strategy to deliver experiences
            that empower and inspire.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 transition-all duration-300 ${selectedService ? "blur-md pointer-events-none" : ""}`}>
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => {
                  if (!service.comingSoon && window.innerWidth < 768) {
                    setSelectedService(service);
                  }
                }}
              >
                <CardGrid
                  whileHover={{ rotateX: 6, rotateY: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 180, damping: 15 }}
                  className="relative bg-black/50 border border-orange-400/10 rounded-2xl md:rounded-3xl p-4 md:p-8 backdrop-blur-lg shadow-[0_10px_40px_rgba(255,140,0,0.1)] hover:shadow-[0_25px_100px_rgba(255,140,0,0.2)] transition-all duration-500 h-full flex flex-col items-center md:items-start text-center md:text-left cursor-pointer md:cursor-default"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-orange-500/10 flex items-center justify-center mb-3 md:mb-6 border border-orange-400/20">
                    <Icon className="text-orange-400 w-5 h-5 md:w-7 md:h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xs md:text-xl font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-1 md:mb-3">
                    {service.title}
                  </h3>

                  {/* Description - Hidden on Mobile */}
                  <p className="hidden md:block text-gray-300 mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features - Hidden on Mobile */}
                  <ul className="hidden md:block space-y-2 text-sm text-gray-400">
                    {service.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 hover:text-orange-300 transition-colors"
                      >
                        <span className="text-orange-400">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Coming Soon Overlay */}
                  {service.comingSoon && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center rounded-2xl md:rounded-3xl border border-white/10">
                      <div className="bg-orange-500/20 border border-orange-500/50 px-3 py-1 md:px-6 md:py-2 rounded-full backdrop-blur-md">
                        <span className="text-[10px] md:text-xl font-heading font-bold text-white tracking-wider uppercase drop-shadow-md whitespace-nowrap">
                          Coming Soon
                        </span>
                      </div>
                      <span className="mt-2 md:mt-3 text-[10px] md:text-sm text-gray-300 font-medium">
                        Launching shortly
                      </span>
                    </div>
                  )}

                </CardGrid>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedService(null)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-black/90 border border-orange-400/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-400/20">
                  <selectedService.icon className="text-orange-400 w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                  {selectedService.title}
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {selectedService.description}
                </p>

                <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/5">
                  <ul className="space-y-3 text-left">
                    {selectedService.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
