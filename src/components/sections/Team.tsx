"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import CardGrid from "../CardGrid";
import SectionWith3D from "../SectionWith3D";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type TeamMember = {
  id?: number;
  name: string;
  role: string;
  bio: string;
  image_url?: string;
  linkedin_url?: string;
  github_url?: string;
  display_order: number;
};

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    setTeamMembers([
      {
        id: 1,
        name: "Kishorekumar",
        role: "Founder & CEO",
        bio: "Visionary leader in digital transformation.",
        image_url: "/team/kishorekumar.jpg",
        display_order: 1
      },
      {
        id: 2,
        name: "Kaniska",
        role: "Co-Founder & UI/UX Designer",
        bio: "UI/UX Design and Development Lead, Supporting project delivery.",
        image_url: "/team/kaniska.jpg",
        display_order: 2
      },
      {
        id: 3,
        name: "Kalidhas",
        role: "Co-Founder & Tech Lead",
        bio: "Tech Lead for Web/Mobile App, backend, and frontend expertise.",
        image_url: "/team/kalidhas.jpg",
        display_order: 3
      }
    ]);
  }, []);

  return (
    <section id="team" className="relative py-16 md:py-36 overflow-hidden bg-black text-white">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 320px at 50% 50%, rgba(255,140,0,0.06), transparent 12%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 backdrop-blur-sm pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="text-center mb-3">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Our{" "}
              <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
          </div>
          <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto">
            The creative minds behind Digital Ascent
          </p>
        </motion.div>

        {/* Desktop View: Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <SectionWith3D
                whileHover={{ rotateX: 4, rotateY: -3, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
                className="relative rounded-3xl overflow-hidden bg-black/40 border border-orange-400/10 shadow-[0_10px_40px_rgba(255,140,0,0.08)] backdrop-blur-xl flex flex-col"
              >
                {/* TOP BANNER IMAGE (Portfolio Style) */}
                <div className="w-full h-80 overflow-hidden rounded-t-3xl border-b border-orange-400/10 shadow-[0_0_25px_rgba(255,140,0,0.28)]">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover object-top bg-black/10 transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-orange-500/10 flex items-center justify-center text-orange-400 text-5xl font-bold">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{member.role}</p>
                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* SOCIAL LINKS */}
                  <div className="flex justify-center gap-3">
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-600/20 rounded-full hover:bg-blue-600/40 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-blue-400" />
                      </a>
                    )}
                    {member.github_url && (
                      <a
                        href={member.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-600/20 rounded-full hover:bg-gray-600/40 transition-colors"
                      >
                        <Github className="w-5 h-5 text-gray-300" />
                      </a>
                    )}
                  </div>
                </div>
              </SectionWith3D>
            </motion.div>
          ))}
        </div>

        {/* Mobile View: Clean Compact Autoplay Carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2500,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full max-w-sm mx-auto"
          >
            <CarouselContent>
              {teamMembers.map((member) => (
                <CarouselItem key={member.id} className="basis-full">
                  <div className="relative rounded-2xl overflow-hidden bg-black/40 border border-orange-400/10 shadow-lg backdrop-blur-xl mx-2">
                    
                    {/* Compact Image */}
                    <div className="w-full h-64 overflow-hidden border-b border-orange-400/10">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full bg-orange-500/10 flex items-center justify-center text-orange-400 text-4xl font-bold">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Compact Content */}
                    <div className="p-5 text-center">
                      <h3 className="text-lg font-bold text-orange-400 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gray-500 text-xs uppercase tracking-wide mb-3">{member.role}</p>
                      <p className="text-gray-300 text-sm leading-snug mb-4 line-clamp-3">
                        {member.bio}
                      </p>

                      {/* Socials */}
                      <div className="flex justify-center gap-4">
                        {member.linkedin_url && (
                          <a
                            href={member.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {member.github_url && (
                          <a
                            href={member.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-200 transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Team;
