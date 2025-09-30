import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  mobileLabel?: string; // Shorter label for mobile
}

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu on resize to larger screens
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Set initial width
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop & Tablet Navigation */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "bg-black/95 backdrop-blur-xl border-b border-cyan-500/40"
              : "bg-black/70 backdrop-blur-lg border-b border-cyan-500/20"
          }
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? "20px 20px" : "30px 30px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className={`flex items-center ${isMobile ? "h-14" : "h-16"}`}>
            {/* Bagian Kiri - Logo + Navigation (Desktop) */}
            <div className="flex items-center gap-8 flex-1">
              {/* Logo/Brand Section */}
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <Link
                  to="/"
                  className="flex items-center gap-2 sm:gap-3 group"
                  aria-label="Go to homepage"
                >
                  {/* Holographic Logo - Responsive Size */}
                  <div className="relative">
                    <div
                      className={`
                      ${isMobile ? "w-8 h-8" : "w-10 h-10"} 
                      bg-gradient-to-br from-black-300 via-yellow-800 to-black-300 
                      rounded-lg flex items-center justify-center relative overflow-hidden
                      transition-all duration-300
                      ${isScrolled ? "shadow-lg shadow-cyan-500/25" : ""}
                    `}
                    >
                      <span
                        className={`text-black font-bold ${
                          isMobile ? "text-lg" : "text-xl"
                        } font-mono`}
                      >
                        ⚡
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-pink-400/20 to-green-400/20 blur-sm" />
                    </div>
                    <div
                      className={`absolute -top-1 -right-1 ${
                        isMobile ? "w-2 h-2" : "w-3 h-3"
                      } bg-cyan-400 rounded-full animate-ping`}
                    />
                  </div>

                  {/* Brand Text - Hide on very small screens */}
                  <div className="hidden xs:block">
                    <h1
                      className={`
                      ${isMobile ? "text-lg" : "text-xl"} 
                      font-black font-mono bg-gradient-to-r from-cyan-400 via-pink-400 to-green-400 bg-clip-text text-transparent
                    `}
                    >
                      {isMobile ? "POKÉMON" : "POKÉMON"}
                    </h1>
                    <div
                      className={`
                      ${isMobile ? "text-xs" : "text-xs"} 
                      text-green-400 font-mono tracking-widest -mt-1
                    `}
                    >
                      {isMobile ? "DB" : "DATABASE"}
                    </div>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation Links - Setelah logo */}
              <div className="hidden md:flex items-center gap-1 lg:gap-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        relative group flex items-center gap-2 lg:gap-3 
                        px-3 lg:px-4 py-2 rounded-lg transition-all duration-300
                        font-mono text-sm tracking-wide border
                        ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-green-500/20 text-white border-cyan-400/30 shadow-lg shadow-cyan-500/25"
                            : "text-gray-300 hover:text-white hover:bg-white/5 border-transparent hover:border-cyan-400/20 hover:shadow-md hover:shadow-cyan-400/10"
                        }
                      `}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {/* Icon */}
                      <span
                        className={`
                          ${isTablet ? "text-lg" : "text-xl"} 
                          transition-all duration-300
                          ${
                            isActive
                              ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                              : "group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]"
                          }
                        `}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>

                      {/* Label - Hidden on tablets in tight spaces */}
                      <span
                        className={`relative ${
                          isTablet && navItems.length > 4
                            ? "hidden lg:inline"
                            : ""
                        }`}
                      >
                        {item.label}

                        {/* Active Indicators */}
                        {isActive && (
                          <>
                            <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                          </>
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Hamburger Menu Button - Kanan (Mobile Only) */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`
                  touch-target flex items-center justify-center p-2
                  rounded-lg transition-all duration-300
                  border border-cyan-400/30 bg-black/40 backdrop-blur-sm
                  hover:bg-cyan-500/10 active:scale-95
                  ${isMobileMenuOpen ? "hamburger-active" : ""}
                `}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`
                    absolute left-0 top-1 w-6 h-0.5 bg-cyan-400 transition-all duration-300 
                    ${isMobileMenuOpen ? "rotate-45 top-3" : ""}
                  `}
                  />
                  <span
                    className={`
                    absolute left-0 top-3 w-6 h-0.5 bg-pink-400 transition-all duration-300 
                    ${isMobileMenuOpen ? "opacity-0" : ""}
                  `}
                  />
                  <span
                    className={`
                    absolute left-0 top-5 w-6 h-0.5 bg-green-400 transition-all duration-300 
                    ${isMobileMenuOpen ? "-rotate-45 top-3" : ""}
                  `}
                  />
                </div>
              </button>
            </div>

            {/* System Status - KANAN (Desktop Only) */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-green-400 tracking-wide">
                  ONLINE
                </span>
              </div>

              {/* Connection Bars - Bar Sinyal */}
              <div className="flex items-end gap-1 h-4">
                <div className="w-1 h-2 bg-cyan-400 rounded-full" />
                <div className="w-1 h-3 bg-cyan-400 rounded-full" />
                <div className="w-1 h-4 bg-cyan-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-cyan-500/30 mobile-menu-enter"
            role="menu"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      role="menuitem"
                      className={`
                        touch-target flex items-center gap-4 p-4 rounded-lg 
                        transition-all duration-300 font-mono border
                        ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-green-500/20 text-white border-cyan-400/30"
                            : "text-gray-300 hover:text-white hover:bg-white/5 border-transparent hover:border-cyan-400/20"
                        }
                      `}
                    >
                      {/* Mobile Icon */}
                      <span
                        className={`
                          text-2xl transition-all duration-300
                          ${
                            isActive
                              ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                              : "group-hover:text-cyan-400"
                          }
                        `}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>

                      {/* Mobile Label */}
                      <div className="flex-1">
                        <span className="text-lg font-medium">
                          {item.mobileLabel || item.label}
                        </span>

                        {/* Active Indicator */}
                        {isActive && (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                            <span className="text-xs text-cyan-300">
                              ACTIVE
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Arrow Icon */}
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isActive ? "text-cyan-400" : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile System Status */}
              <div className="mt-6 pt-4 border-t border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-mono text-green-400">
                      SYSTEM ONLINE
                    </span>
                  </div>
                  <div className="flex items-end gap-1 h-4">
                    <div className="w-1 h-2 bg-cyan-400 rounded-full" />
                    <div className="w-1 h-3 bg-cyan-400 rounded-full" />
                    <div className="w-1 h-4 bg-cyan-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Border Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
      </nav>

      {/* Spacer for fixed navbar */}
      <div className={isMobile ? "h-14" : "h-16"} />

      {/* Overlay untuk mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
