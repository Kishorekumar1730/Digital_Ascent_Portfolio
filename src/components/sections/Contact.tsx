// Contact.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { toast } from "sonner";
import CardGrid from "../CardGrid";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  /* Floating Cursor Effect */
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.animate(
        {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`,
        },
        { duration: 350, fill: "forwards", easing: "ease-out" }
      );
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    const { name, email, message } = formData;
    const encodedMessage = encodeURIComponent(
      `*New Inquiry from Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`
    );
    
    // WhatsApp API link
    const whatsappUrl = `https://wa.me/919345413178?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    toast.success("Redirecting to WhatsApp...");
    setFormData({ name: "", email: "", message: "" });
    setSending(false);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 md:py-32 text-white overflow-hidden"
    >
      {/* Floating Cursor Glow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed w-56 h-56 rounded-full bg-orange-500/10 blur-3xl opacity-40 z-[1]"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Animated Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source
          src="https://cdn.pixabay.com/video/2024/09/12/191986-888267901_large.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#120600]/80 to-black/95 backdrop-blur-md z-[2]" />

      <div className="relative z-[3] container mx-auto px-6">
        {/* Header */}
        <CardGrid className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Get in{" "}
            <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ready to elevate your digital presence? Let's start a conversation.
          </p>
        </CardGrid>

        {/* Contact Info + Form */}
        <div className="max-w-6xl mx-auto">
          
          {/* DESKTOP VIEW - Unchanged */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Info Section */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {[
                { icon: Mail, title: "Email", value: "kishorekumarv25@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=kishorekumarv25@gmail.com", isExternal: true },
                { icon: Phone, title: "Phone", value: "+91 9345413178", href: "tel:+919345413178", isExternal: false },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="flex items-start p-6 rounded-2xl bg-black/50 border border-orange-400/10 backdrop-blur-md 
                  shadow-[0_0_30px_rgba(255,140,0,0.08)] 
                  hover:shadow-[0_0_40px_rgba(255,140,0,0.15)] 
                  hover:bg-black/70 hover:scale-[1.02]
                  transition-all duration-300 block"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-400/20 flex items-center justify-center mr-4">
                    <item.icon className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-300">{item.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* Right Form Section */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-black/60 border border-orange-400/10 backdrop-blur-md p-8 space-y-6 
              shadow-[0_0_40px_rgba(255,140,0,0.08)]"
            >
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-black/50 border border-orange-400/10 text-white placeholder:text-gray-400"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-black/50 border border-orange-400/10 text-white placeholder:text-gray-400"
              />
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={6}
                className="bg-black/50 border border-orange-400/10 text-white placeholder:text-gray-400"
              />
              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold 
                shadow-[0_10px_30px_rgba(255,140,0,0.14)] 
                hover:shadow-[0_10px_40px_rgba(255,140,0,0.3)] 
                transition-all duration-300"
              >
                <Send className="mr-2 h-5 w-5" />
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>
          </div>

          {/* MOBILE VIEW - Compact & Clean */}
          <div className="lg:hidden flex flex-col gap-8">
            {/* Horizontal Compact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { icon: Mail, title: "Email Us", value: "kishorekumarv25@gmail.com", href: "mailto:kishorekumarv25@gmail.com" },
                { icon: Phone, title: "Call Us", value: "+91 9345413178", href: "tel:+919345413178" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center p-4 rounded-xl bg-zinc-900/60 border border-orange-400/10 backdrop-blur-md active:scale-95 transition-transform"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <item.icon className="h-5 w-5 text-orange-400" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-gray-200">{item.title}</h4>
                    <p className="text-xs text-gray-400 truncate w-full">{item.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* Compact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl p-5 space-y-4"
            >
              <div className="space-y-4">
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-black/40 border-white/10 text-sm h-10"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-black/40 border-white/10 text-sm h-10"
                />
                <Textarea
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-black/40 border-white/10 text-sm resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold h-10 text-sm shadow-lg hover:shadow-orange-500/20"
              >
                {sending ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </motion.form>
          </div>
          
        </div>
      </div>

      {/* Smooth cursor blending improvements */}
      <style>{`
        @media (max-width: 768px) {
          div[ref="cursorRef"] {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
