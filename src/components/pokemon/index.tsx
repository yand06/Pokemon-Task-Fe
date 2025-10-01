import React from "react";
import PokemonCard, { type PokemonCardData } from "./PokemonCard";

interface PokemonGridProps {
  pokemons: PokemonCardData[];
  isFavorite?: boolean;
  onRemove?: (nickname: string) => void;
  capturedPokemons?: string[];
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemons,
  isFavorite = false,
  onRemove,
  capturedPokemons = [],
}) => {
  return (
    <div className="grid grid-cols-1 px-4 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {pokemons.map((p) => {
        const captured = capturedPokemons.includes(p.name);
        return (
          <PokemonCard
            key={isFavorite ? p.nickname : p.id}
            pokemon={p}
            isFavorite={isFavorite}
            onRemove={onRemove}
            captured={captured}
          />
        );
      })}
    </div>
  );
};

export default PokemonGrid;
