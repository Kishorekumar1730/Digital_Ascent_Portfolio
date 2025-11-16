"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import SectionWith3D from "@/components/SectionWith3D";
import CardGrid from "../CardGrid";

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

  const fetchMilestones = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("about_timeline")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Failed to fetch milestones", error);
    } else if (data) {
      setMilestones(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMilestones();

    // 🔁 Optional realtime updates
    const subscription = supabase
      .channel("public:about_timeline")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "about_timeline" },
        () => fetchMilestones()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <section
      id="about"
      className="relative py-24 md:py-36 overflow-hidden bg-black text-white"
    >
      {/* 🌌 Animated Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08),transparent_70%)] animate-pulse-slow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/70 backdrop-blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        {/* 🔥 Heading */}
        <div className="text-center mb-16">
          <div className="text-center mb-16">
            <CardGrid className="text-center mb-3">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                About{" "}
                <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Digital Ascent
                </span>
              </h2>
            </CardGrid>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            We’re your partner in digital transformation — driven by design,
            powered by innovation, and obsessed with delivering growth.
          </motion.div>
        </div>

        {/* 🌠 Mission Card */}
        <SectionWith3D
          whileHover={{ scale: 1.03, rotateX: 6 }}
          transition={{ type: "spring", stiffness: 180, damping: 15 }}
          className="max-w-4xl mx-auto mb-24 glass rounded-3xl p-10 md:p-14 text-center shadow-[0_20px_80px_rgba(255,140,0,0.15)]"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Our{" "}
            <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            Empowering businesses with innovative digital solutions that create
            lasting impact and elevate every brand to new heights.
          </p>
        </SectionWith3D>

        {/* 🕓 Timeline */}
        <div className="mb-28">
          <CardGrid className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Our{" "}
              <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
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
            <div className="relative">
              {/* Central Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400/60 to-transparent rounded-full" />

              <div className="space-y-20 md:space-y-24">
                {milestones.map((m, idx) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      idx % 2 === 0
                        ? "md:flex-row"
                        : "md:flex-row-reverse md:text-left"
                    }`}
                  >
                    {/* Text Content */}
                    <div
                      className={`flex-1 ${
                        idx % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <div className="inline-block glass p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-[1.03] transition-transform duration-300">
                        <h4 className="text-2xl font-heading font-bold text-orange-400 mb-3">
                          {m.title}
                        </h4>
                        <p className="text-gray-300">{m.description}</p>
                      </div>
                    </div>

                    {/* Image / Year */}
                    <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden bg-white/5 ring-2 ring-orange-400/20 shadow-[0_0_40px_rgba(255,140,0,0.2)] flex items-center justify-center transform-gpu hover:scale-105 transition-transform duration-300">
                      {m.image_url ? (
                        <img
                          src={m.image_url}
                          alt={m.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-2xl font-bold text-orange-400">
                          {m.year}
                        </div>
                      )}
                    </div>

                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 💎 Core Values */}
        <div>
          <CardGrid className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Our{" "}
              <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Core Values
              </span>
            </h2>
          </CardGrid>

          <CardGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Innovation First",
                desc: "We push boundaries and embrace cutting-edge technologies.",
              },
              {
                title: "Results Driven",
                desc: "Every project is measured by tangible business impact.",
              },
              {
                title: "Client Partnership",
                desc: "We work alongside you as an extension of your team.",
              },
              {
                title: "Excellence Always",
                desc: "Quality and attention to detail in everything we deliver.",
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08, rotateY: 8 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="glass-hover rounded-2xl p-8 text-center group backdrop-blur-xl shadow-[0_20px_60px_rgba(255,140,0,0.1)]"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 border border-orange-400/20 mb-5 group-hover:bg-orange-500/20 transition-all">
                  <div className="text-2xl font-heading text-orange-400">
                    {v.title[0]}
                  </div>
                </div>
                <h4 className="text-xl font-heading font-semibold mb-3">
                  {v.title}
                </h4>
                <p className="text-gray-400">{v.desc}</p>
              </motion.div>
            ))}
          </CardGrid>
        </div>
      </div>
    </section>
  );
};

export default About;
