"use client";

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";
import CardGrid from "../CardGrid";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

type PricingPackage = {
  id?: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
};

const Pricing = () => {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await supabase
        .from("pricing_packages")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching pricing packages:", error);
        setPackages([]);
      } else {
        setPackages(data || []);
      }
      setLoading(false);
    };

    fetchPackages();
  }, []);

  return (
    <section id="pricing" className="relative py-24 md:py-36 overflow-hidden bg-black text-white">
      {/* Soft radial glow (subtle) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 320px at 10% 20%, rgba(255,140,0,0.06), transparent 12%), radial-gradient(600px 300px at 90% 80%, rgba(255,140,0,0.03), transparent 12%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Backdrop gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 backdrop-blur-sm pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <CardGrid className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Pricing{" "}
            <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Packages
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees
          </p>
        </CardGrid>

        {/* Pricing Grid */}
        {loading ? (
          <div className="text-center text-gray-300">
            <p>Loading pricing packages...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center text-gray-300">
            <p>No pricing packages available at the moment. Please check back later.</p>
          </div>
        ) : (
          <CardGrid className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <CardGrid
                  whileHover={{ scale: 1.03, rotateX: 6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 15 }}
                  className={`p-8 rounded-2xl cursor-pointer transition-all transform bg-black/60 backdrop-blur-xl shadow-[0_8px_40px_rgba(255,140,0,0.04)] hover:shadow-[0_20px_80px_rgba(255,140,0,0.15)] ${pkg.popular ? 'ring-1 ring-orange-500/30 border border-orange-400/6' : 'border border-white/6'}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-black rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-heading font-bold mb-2 text-orange-400">{pkg.name}</h3>
                  <div className="text-4xl font-heading font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">{pkg.price}</div>
                  <p className="text-gray-300 mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-orange-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold hover:shadow-[0_10px_30px_rgba(255,140,0,0.3)] transition-all"
                  >
                    Get Started
                  </Button>
                </CardGrid>
              </motion.div>
            ))}
          </CardGrid>
        )}
      </div>
    </section>
  );
};

export default Pricing;
