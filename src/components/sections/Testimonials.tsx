"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionWith3D from "../SectionWith3D";
import CardGrid from "../CardGrid";

type Testimonial = {
  id: string;
  company: string;
  client: string;
  description: string;
  link?: string | null;
  image_url?: string | null;
};

const TABLE = "clients";

const Testimonials: React.FC = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching testimonials:", error);
      setItems([]);
    } else if (data) {
      setItems(
        data.map((row: any) => ({
          id: row.id,
          company: row.company_name,
          client: row.name,
          description: row.description || "",
          link: row.website_url,
          image_url: row.logo_url,
        }))
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();

    // Optional realtime updates
    const subscription = supabase
      .channel("public:clients")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: TABLE },
        () => fetchTestimonials()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-36 overflow-hidden bg-black text-white"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08),transparent_70%)] animate-pulse-slow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80 backdrop-blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <CardGrid className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-3">
            Client{" "}
            <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Delivers
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Hear from brands and leaders who’ve transformed their digital
            journey with us.
          </p>
        </CardGrid>

        {/* Testimonials List */}
        {loading ? (
          <div className="text-center text-lg py-16 animate-pulse text-gray-400">
            Loading testimonials...
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No testimonials available yet.
          </div>
        ) : (
          <CardGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
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
                  {/* Logo or Client Avatar */}
                  <div className="flex justify-center mb-6">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.client}
                        className="w-24 h-24 rounded-full object-cover ring-2 ring-orange-400/30 shadow-[0_0_40px_rgba(255,140,0,0.2)]"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full flex items-center justify-center bg-orange-500/10 text-orange-400 text-3xl font-bold">
                        {item.client[0]}
                      </div>
                    )}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-gray-300 text-base leading-relaxed mb-6 italic">
                    “{item.description}”
                  </blockquote>

                  {/* Client Info */}
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-orange-400">
                      {item.client}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">{item.company}</p>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-orange-300 hover:text-orange-200 transition-colors"
                      >
                        Visit Website <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </SectionWith3D>
              </motion.div>
            ))}
          </CardGrid>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
