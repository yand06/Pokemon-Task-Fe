import React from "react";
import type { Move } from "../../services/pokemon";
import { GiSwordman } from "react-icons/gi";

interface PokemonMovesProps {
  moves?: Move[] | null;
  limit?: number;
}

interface MoveColorConfig {
  gradient: string;
  border: string;
}

// Constants untuk move colors dengan type safety
const MOVE_COLORS: ReadonlyArray<MoveColorConfig> = [
  {
    gradient:
      "bg-gradient-to-br from-red-400/80 via-orange-500/80 to-red-600/80",
    border: "border-red-300/20",
  },
  {
    gradient:
      "bg-gradient-to-br from-blue-400/80 via-cyan-500/80 to-blue-600/80",
    border: "border-blue-300/20",
  },
  {
    gradient:
      "bg-gradient-to-br from-green-400/80 via-emerald-500/80 to-green-600/80",
    border: "border-green-300/20",
  },
  {
    gradient:
      "bg-gradient-to-br from-yellow-400/80 via-amber-500/80 to-yellow-600/80",
    border: "border-yellow-300/20",
  },
  {
    gradient:
      "bg-gradient-to-br from-purple-400/80 via-violet-500/80 to-purple-600/80",
    border: "border-purple-300/20",
  },
  {
    gradient:
      "bg-gradient-to-br from-pink-400/80 via-rose-500/80 to-pink-600/80",
    border: "border-pink-300/20",
  },
  {
    gradient:
      "bg-gradient-to-br from-gray-400/80 via-slate-500/80 to-gray-600/80",
    border: "border-gray-300/20",
  },
  {
    gradient:
      "bg-gradient-to-br from-indigo-400/80 via-blue-500/80 to-indigo-600/80",
    border: "border-indigo-300/20",
  },
  {
    gradient:
      "bg-gradient-to-br from-amber-400/80 via-orange-500/80 to-amber-600/80",
    border: "border-amber-300/20",
  },
  {
    gradient:
      "bg-gradient-to-br from-teal-400/80 via-cyan-500/80 to-teal-600/80",
    border: "border-teal-300/20",
  },
] as const;

const POWER_MOVE_KEYWORDS = ["hyper", "blast", "beam"] as const;
const DEFAULT_LIMIT = 10;

// Defensive utility functions dengan type guards
const isValidMovesArray = (moves: unknown): moves is Move[] => {
  return Array.isArray(moves) && moves.length >= 0;
};

const safeSlice = (array: Move[] | undefined | null, limit: number): Move[] => {
  if (!isValidMovesArray(array)) {
    return [];
  }
  return array.slice(0, limit);
};

const getMoveColorClasses = (index: number): string => {
  const colorConfig = MOVE_COLORS[index % MOVE_COLORS.length];
  return `${colorConfig.gradient} backdrop-blur-md ${colorConfig.border}`;
};

const formatMoveName = (name: string): string => {
  if (typeof name !== "string") return "Unknown Move";
  return name.replace(/-/g, " ");
};

const isPowerMove = (moveName: string): boolean => {
  if (typeof moveName !== "string") return false;
  return POWER_MOVE_KEYWORDS.some((keyword) =>
    moveName.toLowerCase().includes(keyword)
  );
};

// Error boundary untuk handling runtime errors
class PokemonMovesErrorBoundary extends React.Component<
  React.PropsWithChildren<object>,
  { hasError: boolean; error?: Error }
> {
  constructor(props: React.PropsWithChildren<object>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("PokemonMoves Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-gray-800/30 dark:via-gray-900/20 dark:to-gray-800/10 border border-white/20 dark:border-gray-700/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full max-w-full mx-auto">
          <div className="relative z-10 p-4 sm:p-6 lg:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-200/50 to-red-300/50 dark:from-red-700/50 dark:to-red-600/50 flex items-center justify-center mx-auto mb-3">
              <GiSwordman className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 dark:text-red-400" />
            </div>
            <h3 className="font-semibold text-red-700 dark:text-red-300 text-base sm:text-lg mb-2">
              Error Loading Moves
            </h3>
            <p className="text-sm text-red-600 dark:text-red-400">
              Something went wrong while displaying Pokemon moves.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Sub-components dengan error handling
const BackgroundParticles: React.FC = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse" />
    <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
  </div>
));

const HeaderSection: React.FC = React.memo(() => (
  <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-400/30">
      <GiSwordman className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
    </div>
    <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-base sm:text-lg">
      Moves
    </h3>
  </div>
));

interface MoveBadgeProps {
  move: Move;
  index: number;
}

const MoveBadge: React.FC<MoveBadgeProps> = React.memo(({ move, index }) => {
  // Defensive checks untuk move object
  if (!move?.move?.name) {
    return null;
  }

  return (
    <div className="group relative">
      <span
        className={`
          inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 
          text-xs sm:text-sm font-semibold capitalize
          rounded-xl text-white shadow-lg
          transform hover:scale-105 hover:-translate-y-0.5 
          transition-all duration-300 ease-out
          cursor-pointer select-none
          ${getMoveColorClasses(index)}
        `}
      >
        {isPowerMove(move.move.name) && (
          <span className="mr-1.5 text-yellow-300 animate-pulse">⚡</span>
        )}
        {formatMoveName(move.move.name)}
        <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </span>
    </div>
  );
});

interface ShowMoreBadgeProps {
  remainingCount: number;
}

const ShowMoreBadge: React.FC<ShowMoreBadgeProps> = React.memo(
  ({ remainingCount }) => {
    if (remainingCount <= 0) return null;

    return (
      <div className="group relative">
        <span
          className="
          inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 
          text-xs sm:text-sm font-semibold capitalize
          rounded-xl text-white shadow-lg
          transform hover:scale-105 hover:-translate-y-0.5 
          transition-all duration-300 ease-out
          cursor-pointer select-none
          bg-gradient-to-br from-gray-400/80 via-gray-500/80 to-gray-600/80 backdrop-blur-md border border-gray-300/20
        "
        >
          +{remainingCount} more
          <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </span>
      </div>
    );
  }
);

const EmptyState: React.FC = React.memo(() => (
  <div className="w-full text-center py-4 sm:py-6">
    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50 flex items-center justify-center mx-auto mb-2 sm:mb-3">
      <GiSwordman className="w-5 h-5 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500" />
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400">No moves found</p>
  </div>
));

const LoadingState: React.FC = React.memo(() => (
  <div className="w-full text-center py-4 sm:py-6">
    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-200/50 to-blue-300/50 dark:from-blue-700/50 dark:to-blue-600/50 flex items-center justify-center mx-auto mb-2 sm:mb-3 animate-pulse">
      <GiSwordman className="w-5 h-5 sm:w-8 sm:h-8 text-blue-400 dark:text-blue-500" />
    </div>
    <p className="text-sm text-blue-500 dark:text-blue-400">Loading moves...</p>
  </div>
));

const ShineEffect: React.FC = React.memo(() => (
  <div
    className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] hover:translate-x-[200%] transition-transform duration-1000 ease-out hidden sm:block"
    aria-hidden="true"
  />
));

// Main component dengan defensive programming
const PokemonMovesInner: React.FC<PokemonMovesProps> = ({
  moves,
  limit = DEFAULT_LIMIT,
}) => {
  // Defensive checks dan state derivation
  const safeMoves = React.useMemo(
    () => safeSlice(moves, limit),
    [moves, limit]
  );
  const totalMovesCount = isValidMovesArray(moves) ? moves.length : 0;
  const remainingCount = Math.max(0, totalMovesCount - limit);
  const hasMoreMoves = remainingCount > 0;
  const isLoading = moves === undefined;
  const isEmpty = isValidMovesArray(moves) && moves.length === 0;

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-gray-800/30 dark:via-gray-900/20 dark:to-gray-800/10 border border-white/20 dark:border-gray-700/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full max-w-full mx-auto">
      {/* Background gradient overlay - SAMA SEPERTI PokemonAbilities */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10" />

      {/* Subtle animated background particles - SAMA SEPERTI PokemonAbilities */}
      <BackgroundParticles />

      {/* Content container */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <HeaderSection />

        <div className="flex flex-wrap gap-2 sm:gap-3 max-h-40 sm:max-h-48 md:max-h-56 overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/50">
          {isLoading ? (
            <LoadingState />
          ) : isEmpty ? (
            <EmptyState />
          ) : (
            <>
              {safeMoves.map((move, index) => (
                <MoveBadge
                  key={`${move?.move?.name || "unknown"}-${index}`}
                  move={move}
                  index={index}
                />
              ))}
              {hasMoreMoves && (
                <ShowMoreBadge remainingCount={remainingCount} />
              )}
            </>
          )}
        </div>
      </div>

      {/* Shine effect - SAMA SEPERTI PokemonAbilities */}
      <ShineEffect />
    </div>
  );
};

// Component utama dengan error boundary wrapper
const PokemonMoves: React.FC<PokemonMovesProps> = (props) => (
  <PokemonMovesErrorBoundary>
    <PokemonMovesInner {...props} />
  </PokemonMovesErrorBoundary>
);

export default React.memo(PokemonMoves);
