"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CardGrid from "../CardGrid";

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We provide end-to-end digital solutions including strategy, design, development, testing, and ongoing support. Our goal is to deliver a seamless experience from concept to deployment.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on scope, but we ensure timely delivery with clear milestones. We also provide regular updates so you’re always in the loop.",
    },
    {
      question: "Do you work with startups or only established companies?",
      answer:
        "We collaborate with businesses of all sizes, from startups to large enterprises. Every project gets the same attention to detail and dedication.",
    },
    {
      question: "Can I request a custom design for my project?",
      answer:
        "Absolutely! Our team can create bespoke designs tailored to your brand and goals. We focus on making your vision a reality while ensuring usability.",
    },
    {
      question: "What technologies do you use?",
      answer:
        "We use modern tech stacks including React, Node.js, MongoDB, and more depending on project requirements. We always choose the best technology fit for your project.",
    },
    {
      question: "Do you provide post-launch support?",
      answer:
        "Yes, we offer ongoing support and maintenance to ensure your solution runs smoothly. Our team is available to handle updates, improvements, and any issues.",
    },
    {
      question: "Can I track the progress of my project?",
      answer:
        "Yes, we provide regular updates, demos, and access to project management tools for full transparency. You’ll always know exactly where your project stands.",
    },
    {
      question: "Do you optimize for mobile devices?",
      answer:
        "All our projects are responsive and optimized for mobile, tablet, and desktop experiences. We ensure your solution looks great on every screen size.",
    },
    {
      question: "What is your pricing model?",
      answer:
        "Pricing depends on project scope and complexity. We provide detailed proposals after consultation so there are no hidden costs or surprises.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply reach out to us via our consultation form, and we’ll guide you through the next steps. From there, we’ll create a tailored plan just for you.",
    },
  ];

  // animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.995 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        delay: i * 0.04,
        ease: [0.2, 0.8, 0.2, 1] as any,
      },
    }),
  };

  const answerVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.32, ease: [0.2, 0.9, 0.3, 1] as any },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.42, ease: [0.2, 0.9, 0.3, 1] as any },
    },
  };

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="relative py-24 md:py-36 overflow-hidden bg-black text-white"
    >
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

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Heading */}
        <CardGrid className="text-center mb-12 max-w-3xl p-6 md:p-8">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Frequently Asked{" "}
            <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            Click a question to reveal the answer. We refined spacing, animation
            and visual hierarchy for clarity.
          </p>
        </CardGrid>

        {/* FAQ list */}
        <div className="w-full max-w-3xl flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="relative"
              >
                <CardGrid
                  // Card base styling (glassmorphism + subtle border highlight when open)
                  className={`p-6 md:p-8 rounded-2xl cursor-pointer transition-all transform ${
                    isOpen
                      ? "scale-102 ring-1 ring-orange-500/30 border border-orange-400/6"
                      : "border border-white/6"
                  } bg-black/60 backdrop-blur-xl shadow-[0_8px_40px_rgba(255,140,0,0.04)]`}
                  onClick={() => toggle(i)}
                  role="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <div className="flex items-start md:items-center justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={"text-lg md:text-xl font-semibold mb-2 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent"}
                      >
                        {faq.question}
                      </h3>
                      {/* short preview only when closed to hint content */}
                      {!isOpen && (
                        <p className="text-sm text-gray-400 truncate">
                          {faq.answer.length > 140
                            ? faq.answer.slice(0, 140) + "…"
                            : faq.answer}
                        </p>
                      )}
                    </div>

                    {/* chevron / indicator */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        isOpen ? "bg-white/8" : "bg-white/6"
                      }`}
                      aria-hidden
                    >
                      <motion.span
                        animate={{
                          rotate: isOpen ? 180 : 0,
                          scale: isOpen ? 1.06 : 1,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [0.2, 0.85, 0.25, 1],
                        }}
                        className="text-orange-200 font-semibold"
                      >
                        ▼
                      </motion.span>
                    </div>
                  </div>

                  {/* Answer area (animated height) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        key="content"
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={answerVariants}
                        className="mt-4 overflow-hidden text-gray-300 text-sm md:text-base leading-relaxed"
                      >
                        <div className="pt-1 pb-1">{faq.answer}</div>

                        {/* helpful micro-UI under answer */}
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="text-xs text-gray-400">
                            Still have questions?
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              document
                                .getElementById("contact")
                                ?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold text-sm"
                          >
                            Contact Us
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardGrid>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <CardGrid className="p-8 md:p-12 mt-16 text-center max-w-3xl mx-auto bg-black/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(255,140,0,0.05)]">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Have More Questions?
          </h3>
          <p className="text-lg text-gray-400 mb-6">
            Reach out to us directly — we’ll be happy to help and provide
            detailed answers.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-heading font-bold bg-gradient-to-r from-orange-500 to-yellow-400 text-black"
          >
            Contact Us
          </motion.button>
        </CardGrid>
      </div>

      {/* small accessibility / keyboard controls */}
      <style>{`
        /* Slightly increase scale on open, but keep it subtle (choice C: no extra glow) */
        .scale-102 { transform: scale(1.02); }
        .ring-1 { box-shadow: 0 0 0 1px rgba(255,140,0,0.06) inset; }
        /* make the small chevron span smoother looking */
        span { display: inline-block; line-height: 0; }
      `}</style>
    </section>
  );
};

export default FAQ;
