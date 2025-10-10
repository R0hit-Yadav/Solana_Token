import { FC, useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LuMenu, LuX } from "react-icons/lu";
import NetworkSwitcher from "./NetworkSwitcher";

export const AppBar: FC = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const menu = [
    { name: "Home", href: "/#home", id: "home" },
    { name: "Tools", href: "/#tools", id: "tools" },
    { name: "Features", href: "/#features", id: "features" },
    { name: "Price", href: "/#price", id: "price" },
    { name: "FAQ", href: "/#faq", id: "faq" },
  ];

  const scrollToId = (id: string) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string, id?: string) => {
    // If we're already on the home page, just smooth-scroll to the section
    if (router.pathname === "/") {
      e.preventDefault();
      if (id) scrollToId(id);
      setIsMobileMenuOpen(false);
      return;
    }

    // If not on home, navigate to home with hash then scroll
    if (id) {
      e.preventDefault();
      router.push(href).then(() => {
        setTimeout(() => scrollToId(id), 100);
      });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <header 
        id="navbar-sticky" 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-gradient-to-r from-gray-950/95 via-slate-900/95 to-gray-950/95 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10" 
            : "bg-transparent"
        }`}
      >
        {/* Animated background effects for scrolled state */}
        {isScrolled && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
            <div className="absolute top-0 right-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
          </>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center justify-between py-4 h-20">
            {/* Logo */}
            <Link href="/">
              <a className="logo flex items-center group relative z-50">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <img 
                  src="assets/images/logo1.png" 
                  alt="SOLmate Logo" 
                  className="h-20 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(153,69,255,0.5)]" 
                />
              </a>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <ul className="flex items-center gap-1">
                {menu.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <a onClick={(e) => handleNavClick(e, item.href, item.id)} className="relative px-5 py-2.5 text-sm font-bold text-gray-300 transition-all duration-300 group overflow-hidden rounded-lg">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{item.name}</span>
                        
                        {/* Gradient background on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/0 to-cyan-500/0 group-hover:from-purple-600/20 group-hover:via-purple-500/10 group-hover:to-cyan-500/20 transition-all duration-300 rounded-lg"></div>
                        
                        {/* Bottom gradient line */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 via-purple-400 to-cyan-500 group-hover:w-4/5 transition-all duration-500 rounded-full"></div>
                        
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300 rounded-lg"></div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side - Network Switcher & Mobile Menu Button */}
            <div className="flex items-center gap-3">
              {/* Network Switcher - Hidden on mobile */}
              <div className="hidden sm:block">
                <NetworkSwitcher />
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/50 group overflow-hidden" 
                type="button"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isMobileMenuOpen ? (
                  <LuX className="relative z-10 h-5 w-5 text-white transition-all duration-300 group-hover:rotate-90 group-hover:scale-110" />
                ) : (
                  <LuMenu className="relative z-10 h-5 w-5 text-white transition-all duration-300 group-hover:scale-110" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div 
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="relative py-4 space-y-2 bg-gradient-to-b from-gray-900/50 to-slate-900/50 rounded-xl border border-purple-500/20 backdrop-blur-xl overflow-hidden">
              {/* Background effects */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none"></div>
              
              <ul className="space-y-1 px-3 relative z-10">
                {menu.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <a onClick={(e) => handleNavClick(e, item.href, item.id)} className="relative block px-4 py-3 text-sm font-bold text-gray-300 transition-all duration-300 rounded-lg group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-cyan-500/0 group-hover:from-purple-600/20 group-hover:to-cyan-500/20 transition-all duration-300 rounded-lg"></div>
                        <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50"></span>
                          {item.name}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Mobile Network Switcher */}
              <div className="px-3 pt-3 border-t border-purple-500/20 sm:hidden relative z-10">
                <NetworkSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Add padding to content to account for fixed header */}
      <div className="pt-20">
        {props.children}
      </div>
    </div>
  );
};