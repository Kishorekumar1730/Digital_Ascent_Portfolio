"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const clients = [
  {
    id: 1,
    name: "Sadhana Saree Drapping",
    logo: "/testimonials/Sadhana_Saree_Drapping.jpg", 
    description: "Premium saree draping, pre-pleating, and box folding services in Komarapalayam.",
    website: "https://sadhanasareedrapist.netlify.app",
    rating: 5
  },
  {
    id: 2,
    name: "Brocode Studios (pvt.lmt)",
    logo: "/testimonials/BroCode.jpg",
    description: "Digital Marketing Studios. We drive growth and engagement through innovation digital strategies tailored to your business goals.",
    website: "https://brocodedigitalmarketing.netlify.app",
    rating: 5
  },
  {
    id: 3,
    name: "Dhana Tours (pvt.lmt)",
    logo: "/testimonials/DhanaTours.jpg",
    description: "We're not just a travel agency — we're your creative partners in crafting extraordinary journeys. Since 2020, painting memories across the Globe.",
    website: "https://pack-yours-holiday-app.web.app",
    rating: 5
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 md:py-36 bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium tracking-wide">
              OUR TRIBE
            </span>
          </motion.div>
          
          <div className="text-center mb-3">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Client{" "}
              <span className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Testimonials
              </span>
            </h2>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover the businesses we've helped elevate through digital transformation.
          </p>
        </div>

        {/* DESKTOP VIEW - Unchanged */}
        <div className="hidden md:block max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 pb-12">
              {clients.map((client) => (
                <CarouselItem key={client.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full p-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: client.id * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group h-full relative bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden hover:border-orange-500/50 transition-all duration-500 flex flex-col shadow-lg hover:shadow-orange-500/10"
                    >
                      {/* Animated Gradient Border Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      
                      {/* Top-right decorative accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-orange-500/20" />

                      {/* Logo Section */}
                      <div className="relative z-10 mb-6 w-full flex justify-start">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-black border border-white/10 p-2 flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500 shadow-xl shadow-black/50 ring-1 ring-white/5 group-hover:ring-orange-500/30">
                          {client.logo ? (
                            <img 
                              src={client.logo} 
                              alt={client.name} 
                              className="w-full h-full object-cover rounded-xl"
                            />
                          ) : (
                            <span className="text-4xl font-bold text-orange-500">{client.name[0]}</span>
                          )}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="relative z-10 flex-grow">
                        <h3 className="text-2xl font-bold text-white mb-3 bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-200 transition-all duration-300">
                          {client.name}
                        </h3>
                        
                        <p className="text-gray-400 leading-relaxed mb-8 line-clamp-4 group-hover:text-gray-300 transition-colors">
                          {client.description}
                        </p>
                      </div>

                      {/* Footer / Link */}
                      <div className="relative z-10 pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                        <a 
                          href={client.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-orange-400 font-semibold uppercase tracking-wide hover:text-orange-300 transition-colors group/link py-2 px-4 rounded-full bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40"
                        >
                          Visit Website
                          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="left-[-5%] bg-black/50 border-white/10 hover:bg-orange-500 hover:border-orange-500 text-white transition-all disabled:opacity-0" />
              <CarouselNext className="right-[-5%] bg-black/50 border-white/10 hover:bg-orange-500 hover:border-orange-500 text-white transition-all disabled:opacity-0" />
            </div>
          </Carousel>
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
              {clients.map((client) => (
                <CarouselItem key={client.id} className="basis-full pl-4">
                  <div className="h-full pr-4 pb-4">
                    <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 overflow-hidden flex flex-col shadow-lg h-full">
                      
                      {/* Logo & Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-black border border-white/10 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-md">
                          {client.logo ? (
                            <img 
                              src={client.logo} 
                              alt={client.name} 
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <span className="text-2xl font-bold text-orange-500">{client.name[0]}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1 leading-tight">
                            {client.name}
                          </h3>
                          <div className="flex text-orange-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-sm text-gray-300 leading-relaxed mb-4 flex-grow">
                        {client.description}
                      </p>

                      {/* Footer / Link */}
                      <div className="pt-3 border-t border-white/5">
                        <a 
                          href={client.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-xs text-orange-400 font-semibold uppercase tracking-wide py-2 w-full bg-orange-500/5 rounded-lg hover:bg-orange-500/10 transition-colors"
                        >
                          Visit Website
                          <ExternalLink className="w-3 h-3" />
                        </a>
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

export default Testimonials;
