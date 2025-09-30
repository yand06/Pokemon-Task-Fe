import React, { useEffect, useState } from "react";
import { AiOutlineRadarChart } from "react-icons/ai";
import { FiBarChart2 } from "react-icons/fi";
import { TbSparkles } from "react-icons/tb";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Radar as RechartsRadar,
} from "recharts";

type Stat = {
  base_stat: number;
  stat: { name: string };
};

type PokemonStatsProps = {
  stats: Stat[];
};

// Enhanced stat colors with gradients for different stat types
const getStatColor = (statName: string, value: number) => {
  const colors = {
    hp: "from-red-400 via-red-500 to-red-600",
    attack: "from-orange-400 via-orange-500 to-orange-600",
    defense: "from-blue-400 via-blue-500 to-blue-600",
    "special-attack": "from-purple-400 via-purple-500 to-purple-600",
    "special-defense": "from-green-400 via-green-500 to-green-600",
    speed: "from-yellow-400 via-yellow-500 to-yellow-600",
  };

  const baseGradient =
    colors[statName as keyof typeof colors] ||
    "from-gray-400 via-gray-500 to-gray-600";

  if (value >= 120) return `${baseGradient} shadow-lg`;
  if (value >= 80) return `${baseGradient}`;
  return `${baseGradient} opacity-80`;
};

const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
  const [viewType, setViewType] = useState<"bar" | "radar">("bar");
  const [fillWidths, setFillWidths] = useState<number[]>(stats.map(() => 0));
  const [isAnimating, setIsAnimating] = useState(false);

  const radarData = stats.map((s) => ({
    subject: s.stat.name.replace("-", " ").toUpperCase(),
    A: s.base_stat,
    fullMark: 200,
  }));

  const getStatDisplayName = (statName: string) => {
    const names = {
      hp: "HP",
      attack: "Attack",
      defense: "Defense",
      "special-attack": "Sp. Attack",
      "special-defense": "Sp. Defense",
      speed: "Speed",
    };
    return (
      names[statName as keyof typeof names] ||
      statName.charAt(0).toUpperCase() + statName.slice(1)
    );
  };

  const getStatIcon = (statName: string) => {
    const icons = {
      hp: "❤️",
      attack: "⚔️",
      defense: "🛡️",
      "special-attack": "✨",
      "special-defense": "💎",
      speed: "⚡",
    };
    return icons[statName as keyof typeof icons] || "📊";
  };

  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setFillWidths(stats.map((s) => s.base_stat));
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [stats]);

  useEffect(() => {
    if (viewType === "bar") {
      setIsAnimating(true);
      setFillWidths(stats.map(() => 0));

      const timeout = setTimeout(() => {
        setFillWidths(stats.map((s) => s.base_stat));
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [viewType, stats]);

  return (
    <div className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-gray-800/30 dark:via-gray-900/20 dark:to-gray-800/10 border border-white/20 dark:border-gray-700/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full max-w-full mx-auto">
      {/* Background gradient overlay - sama seperti PokemonInfo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10" />

      {/* Subtle animated background particles - sama seperti PokemonInfo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Content container */}
      <div className="relative z-10 p-8">
        {/* Header with enhanced styling */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-400/30">
              <TbSparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-lg">
              Stats
            </h3>
          </div>

          {/* Enhanced toggle button */}
          <button
            onClick={() => setViewType(viewType === "bar" ? "radar" : "bar")}
            className={`group relative p-4 rounded-2xl backdrop-blur-md transition-all duration-500 ease-out transform hover:scale-105 active:scale-95 ${
              isAnimating
                ? "bg-gradient-to-br from-gray-400/30 to-gray-500/30"
                : "bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30"
            } border border-white/20 shadow-lg hover:shadow-xl`}
            disabled={isAnimating}
            title={
              viewType === "bar" ? "Switch to Radar View" : "Switch to Bar View"
            }
          >
            <div className="relative z-10 flex items-center justify-center">
              {viewType === "bar" ? (
                <AiOutlineRadarChart
                  className={`w-6 h-6 transition-all duration-300 ${
                    isAnimating
                      ? "text-gray-500"
                      : "text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                  }`}
                />
              ) : (
                <FiBarChart2
                  className={`w-6 h-6 transition-all duration-300 ${
                    isAnimating
                      ? "text-gray-500"
                      : "text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                  }`}
                />
              )}
            </div>

            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          </button>
        </div>

        {/* Stats content */}
        {viewType === "bar" ? (
          <div className="space-y-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="group p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent dark:from-gray-700/20 dark:to-transparent border border-white/10 dark:border-gray-600/20 hover:from-white/10 hover:to-white/5 dark:hover:from-gray-700/30 dark:hover:to-gray-700/10 transition-all duration-300"
              >
                {/* Stat header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span
                      className="text-xl"
                      role="img"
                      aria-label={s.stat.name}
                    >
                      {getStatIcon(s.stat.name)}
                    </span>
                    <span className="font-semibold text-lg text-gray-700 dark:text-gray-200">
                      {getStatDisplayName(s.stat.name)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-lg font-bold ${
                        s.base_stat >= 120
                          ? "text-green-600 dark:text-green-400"
                          : s.base_stat >= 80
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {s.base_stat}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /200
                    </span>
                  </div>
                </div>

                {/* Enhanced progress bar */}
                <div className="relative">
                  <div className="h-4 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-full backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-inner">
                    <div
                      className={`h-full bg-gradient-to-r ${getStatColor(
                        s.stat.name,
                        s.base_stat
                      )} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                      style={{
                        width: `${Math.min((fillWidths[i] / 200) * 100, 100)}%`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer" />

                      {s.base_stat >= 120 && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                      )}
                    </div>
                  </div>

                  <div className="absolute right-2 top-0 h-full flex items-center">
                    <span className="text-xs font-medium text-white/80 drop-shadow-lg">
                      {Math.round((s.base_stat / 200) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex justify-end">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      s.base_stat >= 120
                        ? "bg-green-500/20 text-green-600 dark:text-green-400 border border-green-400/30"
                        : s.base_stat >= 80
                        ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-400/30"
                        : "bg-gray-500/20 text-gray-600 dark:text-gray-400 border border-gray-400/30"
                    }`}
                  >
                    {s.base_stat >= 120
                      ? "Excellent"
                      : s.base_stat >= 80
                      ? "Good"
                      : "Average"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="p-6 rounded-2xl backdrop-blur-md bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 shadow-lg">
                <ResponsiveContainer width="100%" height={320}>
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="75%"
                    data={radarData}
                  >
                    <PolarGrid
                      stroke="#8b5cf6"
                      strokeOpacity={0.3}
                      strokeWidth={1.5}
                    />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{
                        fill: "#6b7280",
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 200]}
                      tick={{
                        fill: "#9ca3af",
                        fontSize: 10,
                      }}
                      strokeOpacity={0.3}
                    />
                    <RechartsRadar
                      name="Stats"
                      dataKey="A"
                      stroke="url(#radarGradient)"
                      fill="url(#radarFill)"
                      fillOpacity={0.3}
                      strokeWidth={3}
                      isAnimationActive={true}
                      animationDuration={1000}
                      animationEasing="ease-out"
                    />
                    <defs>
                      <linearGradient
                        id="radarGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                        <stop
                          offset="0%"
                          stopColor="#8b5cf6"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#3b82f6"
                          stopOpacity="0.1"
                        />
                      </radialGradient>
                    </defs>
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle shine effect - sama seperti PokemonInfo */}
      <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
    </div>
  );
};

export default PokemonStats;
