import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black border-t border-cyan-500/30">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <div>
                <h3 className="text-lg font-bold font-mono bg-gradient-to-r from-cyan-400 via-pink-400 to-green-400 bg-clip-text text-transparent">
                  POKÉMON DB
                </h3>
                <p className="text-xs text-green-400 font-mono tracking-wide">
                  @yand06
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0">
              Explore the digital world of Pokémon with comprehensive data and
              stats.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-8" />
              <h4 className="text-green-400 text-xs font-mono tracking-widest">
                RESOURCES
              </h4>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-8" />
            </div>

            <div className="space-y-2">
              <a
                href="https://pokeapi.co"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-400 hover:text-cyan-300 transition-colors duration-300 font-mono"
              >
                PokéAPI ↗
              </a>
              <a
                href="https://pokemon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-400 hover:text-pink-300 transition-colors duration-300 font-mono"
              >
                Official Site ↗
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 max-w-8" />
              <h4 className="text-pink-400 text-xs font-mono tracking-widest">
                TECH STACK
              </h4>
              <div className="h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent flex-1 max-w-8" />
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-2 text-xs font-mono">
              <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                React
              </span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                TypeScript
              </span>
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
                Tailwind
              </span>
            </div>
          </div>
        </div>
        <div className="relative mb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
          <div className="text-gray-500 font-mono text-center sm:text-left">
            <p>© 2025 Pokémon Database</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
    </footer>
  );
};

export default Footer;
