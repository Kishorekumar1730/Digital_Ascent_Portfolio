"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Linkedin } from "lucide-react";
import CardGrid from "../CardGrid";
import SectionWith3D from "../SectionWith3D";
import { supabase } from "@/integrations/supabase/client";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching team members:", error);
        setTeamMembers([]);
      } else {
        setTeamMembers(data || []);
      }
      setLoading(false);
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <section id="team" className="relative py-24 md:py-36 overflow-hidden bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">Loading team members...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="relative py-24 md:py-36 overflow-hidden bg-black text-white">
      {/* Soft radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 320px at 50% 50%, rgba(255,140,0,0.06), transparent 12%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Backdrop gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 backdrop-blur-sm pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-center mb-3">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Our{" "}
              <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Team
              </span>
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The creative minds behind Digital Ascent
          </p>
        </motion.div>

        {teamMembers.length === 0 ? (
          <div className="text-center text-gray-300">
            No team members available at the moment.
          </div>
        ) : (
          /* Team Grid */
          <CardGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SectionWith3D
                  whileHover={{ rotateX: 4, rotateY: -3, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 180, damping: 15 }}
                  className="relative glass-hover rounded-3xl p-8 md:p-10 backdrop-blur-xl border border-orange-400/10 shadow-[0_10px_60px_rgba(255,140,0,0.1)] h-full flex flex-col justify-between"
                >
                  {/* Image */}
                  <div className="flex justify-center mb-6">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover ring-2 ring-orange-400/30 shadow-[0_0_40px_rgba(255,140,0,0.2)]"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full flex items-center justify-center bg-orange-500/10 text-orange-400 text-3xl font-bold">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Member Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-orange-400 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{member.role}</p>
                    <p className="text-gray-300 text-base leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Social Links */}
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
          </CardGrid>
        )}
      </div>
    </section>
  );
};

export default Team;
