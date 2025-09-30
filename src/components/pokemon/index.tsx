import React from "react";
import PokemonCard, { type PokemonCardData } from "./PokemonCard";

interface PokemonGridProps {
  pokemons: PokemonCardData[];
  isFavorite?: boolean;
  onRemove?: (nickname: string) => void;
  capturedPokemons?: string[]; // daftar nickname/name Pokémon yang sudah ditangkap
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemons,
  isFavorite = false,
  onRemove,
  capturedPokemons = [],
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {pokemons.map((p) => {
        const captured = capturedPokemons.includes(p.name); // cek sudah ditangkap
        return (
          <PokemonCard
            key={isFavorite ? p.nickname : p.id}
            pokemon={p}
            isFavorite={isFavorite}
            onRemove={onRemove}
            captured={captured} // ✅ pass ke card
          />
        );
      })}
    </div>
  );
};

export default PokemonGrid;
