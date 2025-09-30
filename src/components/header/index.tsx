import React, { useState, useEffect } from "react";
import Navbar, { type NavItem } from "../navbar/Navbar";
import HeaderLogo from "../../assets/pokemon-header.jpg";

interface HeaderProps {
  navItems: NavItem[];
}

const Header: React.FC<HeaderProps> = ({ navItems }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d1117]/95 backdrop-blur-md shadow-lg shadow-blue-500/10"
          : "bg-[#0d1117]"
      } border-b border-gray-800/50`}
    >
      {/* Container tanpa gap atau space */}
      <div className="flex flex-col">
        {/* Logo container */}
        <div
          className={`w-full relative overflow-hidden group bg-gradient-to-br from-amber-900/20 via-yellow-800/10 to-orange-900/20 ${
            isMobile ? "mt-10" : "mt-6"
          }`}
          style={{
            paddingTop: `max(env(safe-area-inset-top, 0px), ${
              isMobile ? "44px" : "0px"
            })`,
          }}
        >
          <div className={`w-full ${isMobile ? "pt-1" : "hidden"}`}>
            <div
              className={`w-full ${
                isMobile
                  ? "aspect-[4/1] sm:aspect-[5/1]"
                  : "aspect-[6/1] lg:aspect-[8/1]"
              }`}
            >
              <img
                src={HeaderLogo}
                alt="Pokemon Logo"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
            </div>
          </div>

          {/* Minimal overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d1117]/20" />

          {/* Animated shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
        <div className="flex justify-center sm:py-1.5 bg-[#0d1117] px-2 sm:px-4 -mt-16">
          <Navbar navItems={navItems} />
        </div>
      </div>
    </header>
  );
};

export default Header;
