import React from "react";
import { Outlet } from "react-router";
import { FaHome } from "react-icons/fa";
import { CgPokemon } from "react-icons/cg";
import Header from "../header";
import Footer from "../footer";

const Layout: React.FC = () => {
  const navItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/my-pokemon", label: "My Pokémon", icon: <CgPokemon /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#070910] text-white">
      <Header navItems={navItems} />
      <main className="flex-1 p-auto pb-auto md:pb-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
