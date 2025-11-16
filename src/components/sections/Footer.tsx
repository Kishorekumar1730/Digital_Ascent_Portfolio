// Footer.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CardGrid from "../CardGrid";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_infos")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      console.error("Error fetching footer contacts:", error);
      setContacts([]);
    } else {
      setContacts((data as ContactInfo[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();

    const subscription = supabase
      .channel("public:contact_infos")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_infos" },
        () => fetchContacts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // helpers to find values
  const findByKey = (key: string) =>
    contacts.find((c) => (c.key || "").toLowerCase() === key.toLowerCase());

  // fallback values if DB empty
  const emailRow = findByKey("email");
  const phoneRow = findByKey("phone");
  const officeRow = findByKey("office") || findByKey("address");

  return (
    <footer className="relative py-24 md:py-36 overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.08),transparent_70%)] animate-pulse-slow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80 backdrop-blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Footer Sections */}
        <CardGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
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
              {officeRow ? officeRow.value : "123 Digital Avenue, Tech City, TX"}
            </p>

            <p className="text-gray-300 text-sm leading-relaxed mb-2">
              <a
                href={emailRow?.link ?? "mailto:hello@company.com"}
                className="hover:text-orange-400 transition flex items-center gap-2"
              >
                <Mail size={16} /> {emailRow ? emailRow.value : "hello@company.com"}
              </a>
            </p>

            <p className="text-gray-300 text-sm leading-relaxed">
              {phoneRow ? phoneRow.value : "+1 (234) 567-890"}
            </p>
          </div>

          {/* Social Media */}
          <div className="glass rounded-3xl p-8 backdrop-blur-xl border border-orange-400/10 shadow-[0_10px_60px_rgba(255,140,0,0.1)] flex flex-col justify-between">
            <h3 className="text-xl font-heading font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4 gradient-to-r from-orange-400 to-yellow-400">
              <a href="#" className="hover:text-orange-300 transition"><Facebook size={24} /></a>
              <a href="#" className="hover:text-orange-300 transition"><Twitter size={24} /></a>
              <a href="#" className="hover:text-orange-300 transition"><Instagram size={24} /></a>
              <a href="#" className="hover:text-orange-300 transition"><Linkedin size={24} /></a>
            </div>
          </div>
        </CardGrid>

        {/* Footer Bottom */}
        <CardGrid className="text-center text-gray-400 text-sm mt-10">
          <p>
            &copy; {new Date().getFullYear()} Digital Ascent. All rights reserved.
          </p>
        </CardGrid>
      </div>
    </footer>
  );
};

export default Footer;
