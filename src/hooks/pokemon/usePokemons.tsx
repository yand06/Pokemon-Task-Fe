import { useEffect, useState } from "react";
import { getPokemons, type PokemonDetail } from "../../services/pokemon";

interface UsePokemonsProps {
  offset?: number;
  limit?: number;
}

export const usePokemons = ({ offset = 0, limit = 20 }: UsePokemonsProps) => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getPokemons(offset, limit);
      if (data) setPokemons(data);
      setLoading(false);
    };

    fetchData();
  }, [offset, limit]);

  return { pokemons, loading };
};
