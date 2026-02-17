"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


type Partnership = {
  id?: number;
  business_name: string;
  partner_name: string;
  bio?: string;
  website_url?: string;
  logo_url?: string;
};

const AUTOPLAY_MS = 3000;

const Partnerships = () => {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isHovering = useRef(false);

  useEffect(() => {
    setPartnerships([
      {
        id: 1,
        business_name: "BROcode(private.limited)",
        partner_name: "BROcode",
        bio: "Digital Marketing Studios",
        website_url: "https://brocodedigitalmarketing.netlify.app/",
        logo_url: "/partners/brocode.jpg",
      },
    ]);
    setLoading(false);
  }, []);

  // Autoplay horizontal scroll
  useEffect(() => {
    if (partnerships.length <= 1) return;

    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!isHovering.current) {
        container.scrollBy({ left: 600, behavior: "smooth" });

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 5
        ) {
          setTimeout(() => container.scrollTo({ left: 0, behavior: "smooth" }), 350);
        }
      }
    }, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [partnerships]);

  const setCardRef = (el: HTMLDivElement | null, i: number) => {
    cardRefs.current[i] = el;
  };

  if (loading) {
    return (
      <section className="py-24 bg-black text-white text-center">
        <p className="text-gray-300">Loading partnerships...</p>
      </section>
    );
  }

  return (
    <section
      id="partnerships"
      className="relative py-24 md:py-36 bg-black text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black/90 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-center mb-3">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Our{" "}
              <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Partnerships
              </span>
            </h2>
          </div>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-3">
            Trusted partners powering our success
          </p>
        </motion.div>

        {/* Hint */}
        {partnerships.length > 1 && (
          <p className="text-sm text-gray-500 mb-4">
            Explore partnerships — drag or use arrows
          </p>
        )}

        {/* DESKTOP VIEW - Unchanged */}
        <div className="hidden md:block">
          {partnerships.length === 0 ? (
            <p className="text-center text-gray-300">No partnerships found.</p>
          ) : (
            <div
              ref={containerRef}
              className={`no-scrollbar overflow-x-auto flex gap-8 py-6 snap-x snap-mandatory scroll-smooth ${
                partnerships.length === 1 ? "justify-center" : ""
              }`}
              onMouseEnter={() => (isHovering.current = true)}
              onMouseLeave={() => (isHovering.current = false)}
            >
              {partnerships.map((partner, i) => (
                <motion.div
                  key={partner.id || i}
                  ref={(el) => setCardRef(el, i)}
                  className="
                    snap-center shrink-0 
                    w-full max-w-[900px] 
                    bg-black/40 
                    rounded-3xl 
                    border border-orange-400/10 
                    p-6 md:p-10 
                    shadow-[0_8px_40px_rgba(0,0,0,0.4)]
                    flex flex-col md:flex-row 
                    gap-6 md:gap-10 
                    items-center
                  "
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Logo Block */}
                  <motion.div
                    className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] flex items-center justify-center shrink-0"
                    whileHover={{ scale: 1.04 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 blur-xl" />

                    <div className="relative w-full h-full rounded-2xl border border-orange-400/20 bg-black/50 p-4 shadow-[0_0_30px_rgba(255,150,0,0.15)] flex items-center justify-center">
                      {partner.logo_url ? (
                        <img
                          src={partner.logo_url}
                          alt={partner.business_name}
                          className="w-full h-full rounded-xl object-contain"
                        />
                      ) : (
                        <div className="w-full h-full rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 text-5xl font-bold">
                          {partner.business_name.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Business Name Badge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-yellow-400 text-black px-3 py-1 rounded-full text-[10px] md:text-xs font-bold shadow-xl whitespace-nowrap z-20">
                      {partner.business_name}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 w-full text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-orange-400 mb-2 md:mb-3">
                      {partner.partner_name}
                    </h3>

                    {partner.bio && (
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4 md:mb-6">
                        {partner.bio}
                      </p>
                    )}
                    
                    {partner.website_url && (
                      <a 
                        href={partner.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-orange-300 hover:text-orange-200 underline text-sm mb-4"
                      >
                        Visit Website
                      </a>
                    )}

                    <div className="flex items-center justify-center md:justify-between mt-2 pt-4 border-t border-white/5">
                      <div className="hidden md:block" />

                      <div className="text-center md:text-right">
                        <p className="text-xs text-gray-500">Business</p>
                        <p className="text-orange-300 font-semibold text-sm">
                          {partner.business_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* MOBILE VIEW - Compact Autoplay Carousel */}
        <div className="md:hidden max-w-sm mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {partnerships.map((partner) => (
                <CarouselItem key={partner.id} className="basis-full">
                  <div className="relative bg-zinc-900/60 border border-orange-400/10 rounded-2xl p-6 flex flex-col items-center text-center backdrop-blur-xl shadow-lg mx-2">
                    
                    {/* Compact Logo */}
                    <div className="relative w-24 h-24 mb-6">
                      <div className="absolute inset-0 rounded-xl bg-orange-500/10 blur-lg" />
                      <div className="relative w-full h-full rounded-xl border border-orange-400/20 bg-black/50 p-2 flex items-center justify-center overflow-hidden">
                        {partner.logo_url ? (
                          <img
                            src={partner.logo_url}
                            alt={partner.business_name}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <span className="text-3xl font-bold text-orange-400">{partner.business_name.charAt(0)}</span>
                        )}
                      </div>
                      {/* Badge */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-yellow-400 text-black px-2 py-0.5 rounded-full text-[8px] font-bold whitespace-nowrap shadow-md z-10">
                        {partner.business_name}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-orange-400 mb-2">
                      {partner.partner_name}
                    </h3>

                    <p className="text-sm text-gray-300 leading-snug mb-4 line-clamp-3">
                      {partner.bio}
                    </p>

                    {partner.website_url && (
                      <a 
                        href={partner.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 text-xs font-semibold hover:bg-orange-500/20 transition-colors"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Center Hint - Only show on desktop if relevant */}
        {partnerships.length > 1 && (
          <p className="hidden md:block text-center text-sm text-gray-500 mt-8">
            Drag horizontally or use arrow keys to explore partnerships.
          </p>
        )}
      </div>
    </section>
  );
};

export default Partnerships;
