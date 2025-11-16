"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type Partnership = {
  id?: number;
  business_name: string;
  partner_name: string;
  bio?: string;
  website_url?: string;
  logo_url?: string;
};

const Partnerships = () => {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartnerships = async () => {
      const { data, error } = await supabase
        .from("partnerships")
        .select("*");

      if (error) {
        console.error("Error fetching partnerships:", error);
        setPartnerships([]);
      } else {
        setPartnerships(data || []);
      }

      setLoading(false);
    };

    fetchPartnerships();
  }, []);

  if (loading) {
    return (
      <section id="partnerships" className="relative py-24 md:py-36 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-300">Loading partnerships...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="partnerships" className="relative py-24 md:py-36 bg-black text-white">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 320px at 50% 50%, rgba(255,140,0,0.06), transparent 12%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 backdrop-blur-sm" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Our{" "}
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Partnerships
            </span>
          </h2>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Trusted partners powering our success
          </p>
        </motion.div>

        {partnerships.length === 0 ? (
          <div className="text-center text-gray-300">No partnerships available yet.</div>
        ) : (
          <div className="relative flex items-center justify-center min-h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-radial from-orange-400/20 to-transparent blur-xl" />
            </div>

            {partnerships.map((p, index) => {
              const angle = (index / partnerships.length) * 360;
              const radius = 180;

              return (
                <motion.div
                  key={p.id || index}
                  className="absolute"
                  initial={{
                    x: Math.cos((angle * Math.PI) / 180) * radius,
                    y: Math.sin((angle * Math.PI) / 180) * radius,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{
                    transformOrigin: `${
                      -Math.cos((angle * Math.PI) / 180) * radius
                    }px ${
                      -Math.sin((angle * Math.PI) / 180) * radius
                    }px`,
                  }}
                >
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/30 to-yellow-400/30 blur-md scale-110 group-hover:scale-125 transition-transform duration-300" />

                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-orange-400/50 bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(255,140,0,0.3)] group-hover:shadow-[0_0_50px_rgba(255,140,0,0.6)] transition-shadow duration-300">
                      {p.logo_url ? (
                        <img
                          src={p.logo_url}
                          alt={p.business_name}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <div className="text-orange-400 text-xs md:text-sm font-bold text-center">
                          {p.business_name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {p.business_name}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Partnerships;
