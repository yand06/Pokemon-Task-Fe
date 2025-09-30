import React from "react";
import type { PokemonDetail } from "../../services/pokemon";

type Props = {
  pokemon: PokemonDetail;
  typeColors: Record<string, string>;
};

const PokemonInfo: React.FC<Props> = ({ pokemon, typeColors }) => (
  <div className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-gray-800/30 dark:via-gray-900/20 dark:to-gray-800/10 border border-white/20 dark:border-gray-700/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full max-w-full mx-auto">
    {/* Background gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10" />

    {/* Subtle animated background particles */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
    </div>

    {/* Content container */}
    <div className="relative z-10 p-8">
      {/* Pokemon name with modern typography */}
      <div className="text-center mb-8">
        <h1 className="font-black text-4xl uppercase tracking-wide bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent drop-shadow-lg">
          {pokemon.name}
        </h1>
        <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
      </div>

      {/* Enhanced image container */}
      <div className="flex justify-center mb-8">
        <div className="relative group">
          {/* Glow effect behind image */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Image container with glassmorphism */}
          <div className="relative p-6 rounded-3xl backdrop-blur-md bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 shadow-lg">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={pokemon.name}
              className="w-48 h-48 transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-2xl filter group-hover:brightness-110"
              onError={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
              }}
            />
          </div>
        </div>
      </div>

      {/* Modern stats container */}
      <div className="backdrop-blur-md bg-white/10 dark:bg-gray-800/20 rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 shadow-lg">
        {/* Stats grid */}
        <div className="space-y-4">
          {/* Weight stat */}
          <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent dark:from-gray-700/20 dark:to-transparent border border-white/10 dark:border-gray-600/20 hover:from-white/10 hover:to-white/5 dark:hover:from-gray-700/30 dark:hover:to-gray-700/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-400/30">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  ⚖️
                </span>
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-200 text-lg">
                Weight
              </span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {(pokemon.weight * 0.1).toFixed(1)} kg
            </span>
          </div>

          {/* Height stat */}
          <div className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent dark:from-gray-700/20 dark:to-transparent border border-white/10 dark:border-gray-600/20 hover:from-white/10 hover:to-white/5 dark:hover:from-gray-700/30 dark:hover:to-gray-700/10 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-400/30">
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  📏
                </span>
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-200 text-lg">
                Height
              </span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              {(pokemon.height * 0.1).toFixed(1)} m
            </span>
          </div>

          {/* Type stat */}
          <div className="group p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent dark:from-gray-700/20 dark:to-transparent border border-white/10 dark:border-gray-600/20 hover:from-white/10 hover:to-white/5 dark:hover:from-gray-700/30 dark:hover:to-gray-700/10 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-400/30">
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  🏷️
                </span>
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-200 text-lg">
                Type
              </span>
            </div>

            <div className="flex gap-3 flex-wrap ml-13">
              {pokemon.types.map((t, i) => (
                <span
                  key={i}
                  className={`px-4 py-2 rounded-xl text-sm font-bold capitalize backdrop-blur-md border shadow-lg transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 ease-out text-white ${
                    typeColors[t.type.name.toLowerCase()] ||
                    "bg-gradient-to-br from-gray-400/80 to-gray-500/80 border-gray-300/30"
                  }`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Subtle shine effect */}
    <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
  </div>
);

export default PokemonInfo;
