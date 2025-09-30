import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import battleground from "../../assets/battleground.png";
import { useBattlePokemon } from "../../hooks/pokemon/useBattlePokemon";

const BattleScreen: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const {
    pokemon,
    loading,
    error,
    pokemonVisible,
    throwing,
    showBall,
    handleCatch,
  } = useBattlePokemon({
    name: name || "",
    onSuccess: () => navigate("/"),
  });

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div
      className="relative w-full flex flex-col items-center justify-end overflow-hidden"
      style={{ height: "calc(100vh - 92px - 60px)" }}
    >
      <img
        src={battleground}
        alt="battle bg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 mb-32">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon?.id}.gif`}
          onError={(e) =>
            ((
              e.target as HTMLImageElement
            ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`)
          }
          alt={pokemon?.name}
          className={`w-40 h-40 transition-all duration-700 ${
            throwing
              ? "scale-90 opacity-50"
              : !pokemonVisible
              ? "translate-x-72 opacity-0"
              : ""
          }`}
        />
      </div>

      {showBall && (
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="pokeball"
          className="absolute bottom-40 w-16 h-16 animate-throw z-20"
        />
      )}

      <div className="flex gap-4 mb-10 z-10">
        {!pokemon || !pokemonVisible ? (
          <></>
        ) : (
          <button
            onClick={() => handleCatch()}
            disabled={throwing}
            className="px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition"
          >
            {throwing ? "Throwing." : "Catch"}
          </button>
        )}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gray-400 text-black rounded-lg font-bold hover:bg-gray-500 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BattleScreen;
