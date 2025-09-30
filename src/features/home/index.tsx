import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import PokemonGrid from "../../components/pokemon";
import Pagination from "../../components/pagination";
import Skeleton from "../../components/skeleton";
import { usePokemons } from "../../hooks/pokemon/usePokemons";

const HomeScreen: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(false);

  const limit = Number(searchParams.get("limit")) || 20;
  const offset = Number(searchParams.get("offset")) || 0;

  const { pokemons, loading } = usePokemons({ offset, limit });

  const myPokemons = useMemo(() => {
    try {
      const stored = localStorage.getItem("myPokemons");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error parsing myPokemons:", error);
      return [];
    }
  }, []);

  const TOTAL_POKEMON = 1300;

  const handleSetOffset = (newOffset: number) => {
    const maxOffset = TOTAL_POKEMON - limit;
    const safeOffset = Math.max(0, Math.min(newOffset, maxOffset));

    setIsAnimating(true);
    setSearchParams({ limit: String(limit), offset: String(safeOffset) });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <div className="fixed inset-0 opacity-20">
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

      <div className="fixed top-10 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-20 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="fixed top-1/2 left-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 border-b border-cyan-500/30 bg-black/50 backdrop-blur-md mt-0 md:mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Neon Title */}
          <div className="text-center mb-2">
            <div className="flex items-center justify-center gap-2">
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-20" />
              <span className="text-green-400 text-sm font-mono tracking-widest">
                POKEMON COLLECTION
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-20" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 py-2">
        <div
          className={`transition-all duration-500 ${
            isAnimating
              ? "opacity-30 scale-95 blur-sm"
              : "opacity-100 scale-100 blur-0"
          }`}
        >
          {loading ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce shadow-lg shadow-cyan-400/50" />
                  <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-150 shadow-lg shadow-pink-400/50" />
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce delay-300 shadow-lg shadow-green-400/50" />
                </div>
              </div>
              <Skeleton limit={limit} />
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <p className="text-sm text-gray-400 font-mono">
                  <span className="text-cyan-400">[{offset + 1}]</span> -
                  <span className="text-pink-400">
                    [{Math.min(offset + limit, TOTAL_POKEMON)}]
                  </span>{" "}
                  of
                  <span className="text-green-400">
                    [{TOTAL_POKEMON.toLocaleString()}]
                  </span>{" "}
                  entities
                </p>
              </div>
              <PokemonGrid
                pokemons={pokemons}
                capturedPokemons={myPokemons.map(
                  (p: { name: string }) => p.name
                )}
              />
            </>
          )}
        </div>

        <div className="mt-8">
          <Pagination
            offset={offset}
            limit={limit}
            setOffset={handleSetOffset}
          />
        </div>

        <div className="sm:hidden mt-6 mb-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-full py-3 bg-gradient-to-r from-blue-500 via-yellow-400 to-green-500 text-black rounded-lg font-bold text-sm tracking-wide shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10">↑ RETURN TO BASE ↑</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-yellow-400 to-green-400 blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
