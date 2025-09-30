import React from "react";
import { Link, useLocation } from "react-router-dom";

export interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface NavMobileProps {
  navItems: NavItem[];
}

const NavMobile: React.FC<NavMobileProps> = ({ navItems }) => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0d1117] border-t border-gray-800 flex justify-around py-2 z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center text-sm py-2 transition-all ${
            location.pathname === item.path
              ? "text-yellow-400 font-semibold"
              : "text-gray-300 hover:text-yellow-400"
          }`}
        >
          <span className="text-2xl">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavMobile;
