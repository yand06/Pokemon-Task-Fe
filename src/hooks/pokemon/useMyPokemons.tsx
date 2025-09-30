import { useEffect, useState } from "react";
import {
  getMyPokemons,
  removeMyPokemon,
  type PokemonWithNickname,
} from "../../services/pokemon";

export const useMyPokemons = () => {
  const [pokemons, setPokemons] = useState<PokemonWithNickname[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemons = async () => {
    setLoading(true);
    const data = await getMyPokemons();
    setPokemons(data);
    setLoading(false);
  };

  const handleRemove = (nickname: string) => {
    removeMyPokemon(nickname);
    setPokemons((prev) => prev.filter((p) => p.nickname !== nickname));
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return { pokemons, loading, handleRemove };
};
