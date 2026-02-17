import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Clients", id: "testimonials" },
    { name: "Process", id: "process" },
    { name: "Partners", id: "partnerships" },
    { name: "FAQ", id: "faq" },

    { name: "Connect", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center py-4">
      <div 
        className={`relative transition-all duration-300 flex items-center justify-between px-6 rounded-2xl border border-white/10
          bg-black/80 backdrop-blur-xl shadow-lg shadow-orange-500/5
          w-[92%] max-w-6xl py-3
        `}
      >
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src={logo}
            alt="Digital Ascent Logo"
            className="h-8 w-8 md:h-10 md:w-10 transition-transform duration-300 group-hover:scale-110"
          />
          <h2 className="text-lg md:text-xl font-heading font-bold text-white">
            Digital{" "}
            <span className="text-lg md:text-xl font-heading font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Ascent
            </span>
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            link.name === "Connect" ? (
              <Button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold shadow-md hover:shadow-orange-500/20 transition-all duration-300 h-9 px-5 text-xs tracking-wide"
              >
                {link.name}
              </Button>
            ) : (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white/80 hover:text-orange-400 transition-colors duration-200 font-medium text-sm"
              >
                {link.name}
              </button>
            )
          ))}
        </div>

        {/* Mobile Menu Button - unchanged logic, just cleaner icon toggle */}
        <div className="md:hidden">
          <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/90 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu - Grid with Floating Effect */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[calc(100%+0.5rem)] right-0 w-64 p-3 rounded-2xl bg-black/95 border border-white/10 backdrop-blur-2xl shadow-2xl z-50 origin-top-right"
            >
              <div className="grid grid-cols-2 gap-2">
                {navLinks.filter(link => link.name !== "Connect").map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: [0, -2, 0]
                    }}
                    transition={{
                      opacity: { duration: 0.2, delay: i * 0.05 },
                      y: { 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut", 
                        delay: i * 0.1 
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(link.id)}
                    className="
                      flex items-center justify-center 
                      py-3 px-2 rounded-xl 
                      bg-zinc-900/50 border border-white/5 
                      text-sm font-medium text-gray-200 
                      hover:bg-zinc-800/80 hover:text-orange-400 hover:border-orange-500/20
                      transition-all shadow-sm
                    "
                  >
                    {link.name}
                  </motion.button>
                ))}
                
                {/* Connect Button - Full Width */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -2, 0]
                  }}
                  transition={{
                    opacity: { duration: 0.3, delay: 0.3 },
                    y: { 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut", 
                      delay: 0.5 
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection("contact")}
                  className="
                    col-span-2 mt-1
                    flex items-center justify-center 
                    py-3 rounded-xl 
                    bg-gradient-to-r from-orange-500 to-yellow-500 
                    text-sm font-bold text-black 
                    shadow-lg shadow-orange-500/20
                  "
                >
                  Connect
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
