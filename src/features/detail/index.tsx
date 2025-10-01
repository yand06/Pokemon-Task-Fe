import React, { useState, useEffect } from "react";
import PokemonStats from "../../components/pokemon/PokemonStats";
import PokemonInfo from "../../components/pokemon/PokemonInfo";
import PokemonAbilities from "../../components/pokemon/PokemonAbilities";
import PokemonMoves from "../../components/pokemon/PokemonMoves";
import { useNavigate } from "react-router";
import { usePokemonDetail } from "../../hooks/pokemon/usePokemonDetail";
import { FaArrowLeft, FaBolt } from "react-icons/fa";

// Cyberpunk-themed warna tipe Pokémon dengan neon effects
const typeColors: Record<string, string> = {
  normal:
    "bg-gradient-to-r from-gray-600 to-gray-500 border-gray-400/50 text-gray-100 shadow-gray-400/25",
  fire: "bg-gradient-to-r from-red-600 to-orange-600 border-red-400/50 text-white shadow-red-500/30",
  water:
    "bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-400/50 text-white shadow-blue-500/30",
  grass:
    "bg-gradient-to-r from-green-600 to-emerald-600 border-green-400/50 text-white shadow-green-500/30",
  electric:
    "bg-gradient-to-r from-yellow-500 to-yellow-400 border-yellow-300/50 text-black shadow-yellow-400/40",
  ice: "bg-gradient-to-r from-cyan-500 to-blue-400 border-cyan-300/50 text-black shadow-cyan-400/30",
  fighting:
    "bg-gradient-to-r from-orange-700 to-red-700 border-orange-400/50 text-white shadow-orange-500/30",
  poison:
    "bg-gradient-to-r from-purple-600 to-violet-600 border-purple-400/50 text-white shadow-purple-500/30",
  ground:
    "bg-gradient-to-r from-yellow-700 to-amber-700 border-yellow-500/50 text-white shadow-yellow-600/30",
  flying:
    "bg-gradient-to-r from-indigo-400 to-sky-400 border-indigo-300/50 text-black shadow-indigo-400/30",
  psychic:
    "bg-gradient-to-r from-pink-600 to-fuchsia-600 border-pink-400/50 text-white shadow-pink-500/30",
  bug: "bg-gradient-to-r from-lime-600 to-green-500 border-lime-400/50 text-black shadow-lime-500/30",
  rock: "bg-gradient-to-r from-stone-700 to-amber-800 border-stone-500/50 text-white shadow-stone-600/30",
  ghost:
    "bg-gradient-to-r from-indigo-800 to-purple-800 border-indigo-500/50 text-white shadow-indigo-600/30",
  dark: "bg-gradient-to-r from-gray-900 to-slate-800 border-gray-600/50 text-white shadow-gray-700/30",
  dragon:
    "bg-gradient-to-r from-indigo-700 to-purple-700 border-indigo-500/50 text-white shadow-indigo-600/30",
  steel:
    "bg-gradient-to-r from-gray-600 to-slate-600 border-gray-400/50 text-white shadow-gray-500/30",
  fairy:
    "bg-gradient-to-r from-pink-400 to-rose-400 border-pink-300/50 text-black shadow-pink-400/30",
};

// Ambil pokeName dari URL
const getParamsFromUrl = () => {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const pokeName = pathParts[1];
  return { pokeName };
};

const DetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { pokeName } = getParamsFromUrl();
  const { pokemon, error, isCaught } = usePokemonDetail({
    name: pokeName || "",
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [pokemon]);

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-8 border border-red-500/30 rounded-lg bg-red-500/10">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-mono text-red-400 mb-2">SYSTEM ERROR</h2>
          <p className="text-red-300 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-red-500/20 border border-red-400/50 rounded-lg text-red-300 hover:bg-red-500/30 transition-all duration-300 font-mono"
          >
            ← GO BACK
          </button>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce shadow-lg shadow-cyan-400/50" />
            <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-150 shadow-lg shadow-pink-400/50" />
            <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce delay-300 shadow-lg shadow-green-400/50" />
          </div>
          <p className="text-cyan-400 font-mono tracking-wide">
            SCANNING POKEMON DATABASE...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden mt-0 md:mt-7">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Header Section */}
      <div className="relative z-10 border-b border-cyan-500/30 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 px-4 py-2 border border-cyan-400/30 rounded-lg
                        bg-black/40 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 
                        hover:text-cyan-200 transition-all duration-300 font-mono text-sm"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              BACK TO POKEMON LIST
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div
          className={`transition-all duration-500 ${
            isAnimating
              ? "opacity-30 scale-95 blur-sm"
              : "opacity-100 scale-100 blur-0"
          }`}
        >
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PokemonInfo pokemon={pokemon} typeColors={typeColors} />
            <PokemonStats stats={pokemon.stats} />
            <PokemonAbilities abilities={pokemon.abilities} />
            <PokemonMoves moves={pokemon.moves} />
          </div>

          {/* Action Buttons Section */}
          <div className="flex flex-col items-center gap-6">
            {/* Catch Status */}
            {isCaught ? (
              <div className="text-center p-6 border border-green-400/30 rounded-lg bg-green-500/10 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg">✓</span>
                  </div>
                  <h3 className="text-xl font-mono text-green-400">
                    POKEMON CAPTURED
                  </h3>
                </div>
                <p className="text-green-300 font-mono text-sm">
                  This Pokémon is already in your collection!
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                  <span className="text-xs text-green-500 font-mono tracking-widest">
                    STATUS: OWNED
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1 max-w-16" />
                    <span className="text-yellow-400 text-xs font-mono tracking-widest">
                      CAPTURE ZONE
                    </span>
                    <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent flex-1 max-w-16" />
                  </div>
                  <p className="text-gray-400 text-sm font-mono">
                    Ready to add this Pokémon to your collection?
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/battle/${pokemon.name}`)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 
                            text-black rounded-lg font-bold text-lg transition-all duration-300
                            hover:from-yellow-400 hover:via-yellow-300 hover:to-orange-400
                            hover:shadow-lg hover:shadow-yellow-400/30 hover:-translate-y-1
                            active:scale-95 border-2 border-yellow-300/50"
                >
                  <span className="relative z-10 flex items-center gap-3 font-mono tracking-wide">
                    <FaBolt className="group-hover:rotate-12 transition-transform duration-300" />
                    INITIATE CAPTURE
                    <FaBolt className="group-hover:-rotate-12 transition-transform duration-300" />
                  </span>

                  {/* Glow Effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 via-yellow-300/50 to-orange-400/50 
                                  rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity"
                  />

                  {/* Animated Border */}
                  <div
                    className="absolute inset-0 rounded-lg border-2 border-transparent 
                                  bg-gradient-to-r from-yellow-300 via-yellow-200 to-orange-300 
                                  opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"
                    style={{
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                    }}
                  />
                </button>

                {/* Battle Preview */}
                <div className="mt-4 text-xs font-mono text-gray-500">
                  <p>
                    Battle difficulty:{" "}
                    <span className="text-yellow-400">⚡ MODERATE</span>
                  </p>
                </div>
              </div>
            )}

            {/* Additional Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/my-pokemon")}
                className="px-6 py-2 border border-cyan-500/50 rounded-lg text-cyan-400 
                          hover:border-cyan-400/70 hover:text-cyan-300 hover:bg-cyan-500/10 
                          transition-all duration-300 font-mono text-sm"
              >
                MY COLLECTION →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
    </div>
  );
};

export default DetailScreen;
