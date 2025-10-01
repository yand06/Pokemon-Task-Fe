import React from "react";
import { useNavigate } from "react-router";

type PokemonType = { type: { name: string } };

export type PokemonCardData = {
  id: number;
  name: string;
  types?: PokemonType[];
  nickname?: string;
};

// Modern glassmorphism and neomorphism inspired type colors
const typeColors: Record<string, string> = {
  normal:
    "bg-gradient-to-br from-slate-400/80 via-slate-500/80 to-slate-600/80 backdrop-blur-md border border-slate-300/20",
  fire: "bg-gradient-to-br from-red-400/80 via-orange-500/80 to-red-600/80 backdrop-blur-md border border-red-300/20",
  water:
    "bg-gradient-to-br from-blue-400/80 via-cyan-500/80 to-blue-600/80 backdrop-blur-md border border-blue-300/20",
  grass:
    "bg-gradient-to-br from-green-400/80 via-emerald-500/80 to-green-600/80 backdrop-blur-md border border-green-300/20",
  electric:
    "bg-gradient-to-br from-yellow-300/80 via-amber-400/80 to-yellow-500/80 backdrop-blur-md border border-yellow-300/20",
  ice: "bg-gradient-to-br from-cyan-300/80 via-sky-400/80 to-cyan-500/80 backdrop-blur-md border border-cyan-300/20",
  fighting:
    "bg-gradient-to-br from-orange-500/80 via-red-600/80 to-orange-700/80 backdrop-blur-md border border-orange-300/20",
  poison:
    "bg-gradient-to-br from-purple-400/80 via-violet-500/80 to-purple-600/80 backdrop-blur-md border border-purple-300/20",
  ground:
    "bg-gradient-to-br from-yellow-600/80 via-amber-700/80 to-yellow-800/80 backdrop-blur-md border border-yellow-300/20",
  flying:
    "bg-gradient-to-br from-indigo-300/80 via-sky-400/80 to-indigo-500/80 backdrop-blur-md border border-indigo-300/20",
  psychic:
    "bg-gradient-to-br from-pink-400/80 via-fuchsia-500/80 to-pink-600/80 backdrop-blur-md border border-pink-300/20",
  bug: "bg-gradient-to-br from-lime-400/80 via-green-500/80 to-lime-600/80 backdrop-blur-md border border-lime-300/20",
  rock: "bg-gradient-to-br from-stone-500/80 via-amber-700/80 to-stone-700/80 backdrop-blur-md border border-stone-300/20",
  ghost:
    "bg-gradient-to-br from-indigo-600/80 via-purple-700/80 to-indigo-800/80 backdrop-blur-md border border-indigo-300/20",
  dark: "bg-gradient-to-br from-gray-700/80 via-slate-800/80 to-gray-900/80 backdrop-blur-md border border-gray-300/20",
  dragon:
    "bg-gradient-to-br from-indigo-500/80 via-purple-600/80 to-indigo-700/80 backdrop-blur-md border border-indigo-300/20",
  steel:
    "bg-gradient-to-br from-gray-400/80 via-slate-500/80 to-gray-600/80 backdrop-blur-md border border-gray-300/20",
  fairy:
    "bg-gradient-to-br from-pink-300/80 via-rose-400/80 to-pink-500/80 backdrop-blur-md border border-pink-300/20",
};

interface PokemonCardProps {
  pokemon: PokemonCardData;
  isFavorite?: boolean;
  onRemove?: (nickname: string) => void;
  captured?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite = false,
  onRemove,
  captured = false,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`
        group cursor-pointer relative overflow-hidden
        rounded-2xl backdrop-blur-lg border border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:scale-[1.02]
        before:absolute before:inset-0 before:rounded-3xl
        before:bg-gradient-to-br before:from-white/5 before:to-transparent
        before:transition-all before:duration-500
        hover:before:from-white/10 hover:before:to-white/5
        ${
          isFavorite
            ? "bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-purple-900/20 border-gradient border-2 border-transparent bg-gradient-to-br from-yellow-400/30 via-amber-400/30 to-yellow-500/30"
            : captured
            ? "bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-emerald-600/10 border-emerald-400/30"
            : "bg-gradient-to-br from-white/5 via-gray-50/5 to-white/5 dark:from-gray-800/10 dark:via-gray-700/10 dark:to-gray-800/10"
        }
      `}
      onClick={() => navigate(`/detail/${pokemon.name}`)}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

      <div className="relative z-10 p-6 flex flex-col items-center">
        {isFavorite && pokemon.nickname && onRemove && (
          <button
            className="absolute top-2 right-2 z-20 group/btn
    w-6 h-6 sm:w-7 sm:h-7 rounded-md backdrop-blur-xl
    bg-gradient-to-br from-red-500/80 to-red-600/80
    hover:from-red-600/90 hover:to-red-700/90
    border border-white/20 shadow-lg
    flex items-center justify-center text-white font-bold text-sm
    transform transition-all duration-300 ease-out
    hover:scale-110 hover:rotate-90 hover:shadow-xl
    active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(pokemon.nickname!);
            }}
          >
            <span className="transition-transform duration-300 group-hover/btn:rotate-180 leading-none">
              ×
            </span>
          </button>
        )}

        {/* Modern nickname badge with glassmorphism */}
        {isFavorite && pokemon.nickname && (
          <div className="mb-4 px-4 py-2 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-yellow-500/20 border border-yellow-300/30 shadow-lg">
            <p className="text-sm font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              {pokemon.nickname}
            </p>
          </div>
        )}

        {/* Enhanced image container with modern effects */}
        <div className="relative mb-6 group/image">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-100/10 to-gray-200/10 dark:from-gray-700/10 dark:to-gray-600/10 backdrop-blur-sm border border-white/10" />
          <div className="relative p-4 rounded-2xl overflow-hidden">
            {/* Animated background ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 opacity-0 group-hover/image:opacity-100 transition-all duration-500 animate-pulse" />

            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
              onError={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
              }}
              alt={pokemon.name}
              className="relative z-10 w-28 h-28 transition-all duration-500 ease-out
                group-hover/image:scale-110 group-hover/image:drop-shadow-2xl
                filter group-hover/image:brightness-110 group-hover/image:saturate-110"
            />
          </div>
        </div>

        {/* Modern Pokemon name with enhanced typography */}
        <h3
          className="capitalize font-bold text-xl mb-4 text-center
          bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 
          dark:from-white dark:via-gray-200 dark:to-white 
          bg-clip-text text-transparent
          tracking-wide transition-all duration-300
          group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600
          dark:group-hover:from-blue-400 dark:group-hover:via-purple-400 dark:group-hover:to-pink-400"
        >
          {pokemon.name}
        </h3>

        {/* Enhanced type badges with modern glassmorphism */}
        {pokemon.types && (
          <div className="flex gap-2 flex-wrap justify-center">
            {pokemon.types.map((t, i) => (
              <span
                key={i}
                className={`
                  px-4 py-2 rounded-xl text-xs font-semibold capitalize
                  transform transition-all duration-300 ease-out
                  hover:scale-105 hover:-translate-y-0.5
                  text-white shadow-lg hover:shadow-xl
                  ${
                    typeColors[t.type.name] ||
                    "bg-gradient-to-br from-gray-400/80 to-gray-500/80 backdrop-blur-md border border-gray-300/20"
                  }
                `}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Subtle shine effect on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
        bg-gradient-to-tr from-transparent via-white/5 to-transparent
        transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]
        transition-transform duration-1000 ease-out"
      />
    </div>
  );
};

export default PokemonCard;
