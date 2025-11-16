import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

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
    { name: "Portfolio", id: "portfolio" },
    { name: "Process", id: "process" },
    { name: "Pricing", id: "pricing" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={logo}
            alt="Digital Ascent Logo"
            className="h-12 w-12 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,119,53,0.5)]"
          />
          <h2 className="text-2xl md font-heading font-bold">
            Digital{" "}
            <span className="text-2xl font-heading font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Ascent
            </span>
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
            >
              {link.name}
            </button>
          ))}
          <Link to="/admin">
            <Button
              variant="outline"
              className="glass-hover border-primary/50 hover:border-primary rounded-full p-3"
            >
              <Shield className="h-5 w-5 text-gradient-to-r from-orange-400 to-yellow-400" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden glass p-2 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass mt-2 mx-4 rounded-lg p-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left py-2 px-4 rounded hover:bg-primary/10 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <Link to="/admin" className="block">
            <Button variant="outline" className="w-full glass-hover">
              Admin
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
