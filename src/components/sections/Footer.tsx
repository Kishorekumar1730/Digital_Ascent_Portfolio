// Footer.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CardGrid from "../CardGrid";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";


type ContactInfo = {
  id: string;
  key?: string | null;
  label: string;
  value: string;
  link?: string | null;
  type?: string | null;
  display_order?: number | null;
  is_active?: boolean | null;
};

const Footer = () => {
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setContacts([
      { id: "1", key: "email", label: "Email", value: "kishorekumarv25@gmail.com", link: "https://mail.google.com/mail/?view=cm&fs=1&to=kishorekumarv25@gmail.com" },
      { id: "2", key: "phone", label: "Phone", value: "+91 9345413178" },
    ]);
    setLoading(false);
  }, []);

  // helpers to find values
  const findByKey = (key: string) =>
    contacts.find((c) => (c.key || "").toLowerCase() === key.toLowerCase());

  // fallback values if DB empty
  const emailRow = findByKey("email");
  const phoneRow = findByKey("phone");

  return (
    <footer className="relative py-24 md:py-36 overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08),transparent_70%)] animate-pulse-slow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80 backdrop-blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* DESKTOP VIEW - Unchanged */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {/* About */}
          <div className="glass rounded-3xl p-8 backdrop-blur-xl border border-orange-400/10 shadow-[0_10px_60px_rgba(255,140,0,0.1)]">
            <h3 className="text-xl font-heading font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              About Us
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We craft innovative digital solutions with a focus on design, technology, and business growth.
            </p>
          </div>

          {/* Quick Links */}
          <div className="glass rounded-3xl p-8 backdrop-blur-xl border border-orange-400/10 shadow-[0_10px_60px_rgba(255,140,0,0.1)]">
            <h3 className="text-xl font-heading font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              Quick Links
            </h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><a href="#process" className="hover:text-orange-400 transition">Process</a></li>
              <li><a href="#faq" className="hover:text-orange-400 transition">FAQ</a></li>
              <li><a href="#services" className="hover:text-orange-400 transition">Services</a></li>
              <li><a href="#contact" className="hover:text-orange-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="glass rounded-3xl p-8 backdrop-blur-xl border border-orange-400/10 shadow-[0_10px_60px_rgba(255,140,0,0.1)]">
            <h3 className="text-xl font-heading font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              Contact
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed mb-2">
              <a
                href={emailRow?.link ?? "https://mail.google.com/mail/?view=cm&fs=1&to=kishorekumarv25@gmail.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition flex items-center gap-2"
              >
                <Mail size={16} /> {emailRow ? emailRow.value : "kishorekumarv25@gmail.com"}
              </a>
            </p>

            <p className="text-gray-300 text-sm leading-relaxed">
              <a
                href={`tel:${phoneRow ? phoneRow.value.replace(/\s+/g, '') : "+919345413178"}`}
                className="hover:text-orange-400 transition flex items-center gap-2"
              >
                <Phone size={16} /> {phoneRow ? phoneRow.value : "+91 9345413178"}
              </a>
            </p>
          </div>

          {/* Social Media */}
          <div className="glass rounded-3xl p-8 backdrop-blur-xl border border-orange-400/10 shadow-[0_10px_60px_rgba(255,140,0,0.1)]">
            <h3 className="text-xl font-heading font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/digitalascent._?igsh=eHVkOGdsb29xNndq" target="_blank" className="hover:text-orange-300 transition"><Instagram size={24} /></a>
              <a href="https://www.linkedin.com/in/kishorekumar1310" target="_blank" className="hover:text-orange-300 transition"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW - Clean, Compact, Full Details with Float */}
        <div className="md:hidden flex flex-col gap-4 mb-10">
          
          {/* 1. About - Full Width */}
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
            className="bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 border border-orange-400/10 shadow-lg text-center"
          >
            <h3 className="text-lg font-heading font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
              About Digital Ascent
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We craft innovative digital solutions with a focus on design, technology, and business growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {/* 2. Quick Links */}
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="bg-zinc-900/60 backdrop-blur-md rounded-2xl p-5 border border-orange-400/10 shadow-lg flex flex-col items-center"
            >
              <h3 className="text-base font-bold text-white mb-3 border-b border-orange-500/20 pb-1 w-full text-center">
                Explore
              </h3>
              <ul className="space-y-2 text-sm text-gray-400 text-center w-full">
                <li><a href="#services" className="hover:text-orange-400 block py-1">Services</a></li>
                <li><a href="#process" className="hover:text-orange-400 block py-1">Process</a></li>
                <li><a href="#faq" className="hover:text-orange-400 block py-1">FAQ</a></li>
              </ul>
            </motion.div>

            {/* 3. Socials */}
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="bg-zinc-900/60 backdrop-blur-md rounded-2xl p-5 border border-orange-400/10 shadow-lg flex flex-col items-center"
            >
              <h3 className="text-base font-bold text-white mb-3 border-b border-orange-500/20 pb-1 w-full text-center">
                Follow
              </h3>
              <div className="flex flex-col gap-3 items-center justify-center flex-1">
                <a href="https://www.instagram.com/digitalascent._?igsh=eHVkOGdsb29xNndq" target="_blank" className="p-2 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500/80 text-white shadow-md hover:scale-110 transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://www.linkedin.com/in/kishorekumar1310" target="_blank" className="p-2 rounded-full bg-blue-600/80 text-white shadow-md hover:scale-110 transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </motion.div>
          </div>



        </div>

        {/* Footer Bottom */}
        <CardGrid className="text-center text-gray-400 text-sm mt-10">
          <p>
            &copy; 2025 Digital Ascent. All rights reserved.
          </p>
        </CardGrid>
      </div>
    </footer>
  );
};

export default Footer;
