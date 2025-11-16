"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Rocket,
  BarChart3,
  Smartphone,
  Cloud,
  Clock,
} from "lucide-react";
import CardGrid from "../CardGrid";
import SectionWith3D from "../SectionWith3D";

type Service = {
  key: string;
  icon: any;
  title: string;
  description: string;
  features: string[];
};

const Services = () => {
  const [serviceStatus, setServiceStatus] = useState<{
    [key: string]: boolean;
  }>({});

  // 🧠 Load service availability from localStorage (controlled via Admin)
  useEffect(() => {
    const stored = localStorage.getItem("serviceStatus");
    if (stored) setServiceStatus(JSON.parse(stored));
  }, []);

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
    },
  ];

  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* 🔥 Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.06),transparent_70%)] opacity-70 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <CardGrid className="text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Our{" "}
              <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
          </CardGrid>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We blend creativity, technology, and strategy to deliver experiences
            that empower and inspire.
          </p>
        </motion.div>

        {/* Services Grid */}
        <CardGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isComingSoon = serviceStatus[service.key] || false;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CardGrid
                  whileHover={{ rotateX: 6, rotateY: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 180, damping: 15 }}
                  className="relative bg-black/50 border border-orange-400/10 rounded-3xl p-8 backdrop-blur-lg shadow-[0_20px_80px_rgba(255,140,0,0.1)] hover:shadow-[0_25px_100px_rgba(255,140,0,0.2)] transition-all duration-500"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-400/20">
                    <Icon className="text-orange-400 w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 text-sm text-gray-400">
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
                  {isComingSoon && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-3xl backdrop-blur-md"
                    >
                      <div className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent text-white font-semibold px-5 py-2 rounded-full shadow-lg animate-pulse">
                        <Clock size={16} /> Unavailable
                      </div>
                    </motion.div>
                  )}
                </CardGrid>
              </motion.div>
            );
          })}
        </CardGrid>
      </div>
    </section>
  );
};

export default Services;
