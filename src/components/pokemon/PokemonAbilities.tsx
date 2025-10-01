import React from "react";
import type { Ability } from "../../services/pokemon";
import { TbBrain } from "react-icons/tb";

type Props = {
  abilities: Ability[];
};

// Ability type colors dengan glassmorphism styling
const getAbilityColor = (_name: string, index: number) => {
  const colors = [
    "bg-gradient-to-br from-blue-400/80 via-cyan-500/80 to-blue-600/80 backdrop-blur-md border border-blue-300/20",
    "bg-gradient-to-br from-purple-400/80 via-violet-500/80 to-purple-600/80 backdrop-blur-md border border-purple-300/20",
    "bg-gradient-to-br from-green-400/80 via-emerald-500/80 to-green-600/80 backdrop-blur-md border border-green-300/20",
    "bg-gradient-to-br from-pink-400/80 via-rose-500/80 to-pink-600/80 backdrop-blur-md border border-pink-300/20",
    "bg-gradient-to-br from-orange-400/80 via-amber-500/80 to-orange-600/80 backdrop-blur-md border border-orange-300/20",
  ];

  return colors[index % colors.length];
};

const PokemonAbilities: React.FC<Props> = ({ abilities }) => (
  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-gray-800/30 dark:via-gray-900/20 dark:to-gray-800/10 border border-white/20 dark:border-gray-700/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full max-w-full mx-auto">
    {/* Background gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10" />

    {/* Subtle animated background particles */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
    </div>

    {/* Content container */}
    <div className="relative z-10 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-400/30">
          <TbBrain className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-base sm:text-lg">
          Abilities
        </h3>
      </div>

      {/* Abilities badges container */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {abilities.map((a, i) => (
          <div key={i} className="group relative">
            <span
              className={`
                inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 
                text-xs sm:text-sm font-semibold capitalize
                rounded-xl text-white shadow-lg
                transform hover:scale-105 hover:-translate-y-0.5 
                transition-all duration-300 ease-out
                cursor-pointer select-none
                ${getAbilityColor(a.ability.name, i)}
              `}
            >
              {/* Hidden ability indicator */}
              {a && (
                <span className="mr-1.5 text-yellow-300 animate-pulse">⭐</span>
              )}

              {a.ability.name.replace("-", " ")}

              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </span>
          </div>
        ))}

        {/* Empty state */}
        {abilities.length === 0 && (
          <div className="w-full text-center py-4 sm:py-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50 flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <TbBrain className="w-5 h-5 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No abilities found
            </p>
          </div>
        )}
      </div>
    </div>

    {/* Shine effect */}
    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] hover:translate-x-[200%] transition-transform duration-1000 ease-out hidden sm:block" />
  </div>
);

export default PokemonAbilities;
