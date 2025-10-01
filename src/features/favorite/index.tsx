import React from "react";
import PokemonGrid from "../../components/pokemon";
import { useMyPokemons } from "../../hooks/pokemon/useMyPokemons";
import Skeleton from "../../components/skeleton";

const MyPokemon: React.FC = () => {
  const { pokemons, loading, handleRemove } = useMyPokemons();

  if (loading) {
    return (
      <div className="p-2">
        <Skeleton limit={20} />
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="p-4 text-center text-gray-300">
        Belum ada Pokémon yang ditangkap
      </div>
    );
  }

  return (
    <div className="p-6">
      <PokemonGrid pokemons={pokemons} isFavorite onRemove={handleRemove} />
    </div>
  );
};

export default MyPokemon;
