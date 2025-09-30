import { useState, useEffect } from "react";
import { getPokemonDetail, type PokemonDetail } from "../../services/pokemon";

interface UsePokemonDetailProps {
  name: string;
}

export const usePokemonDetail = ({ name }: UsePokemonDetailProps) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCaught, setIsCaught] = useState<boolean>(false);

  useEffect(() => {
    if (!name) return;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getPokemonDetail(name);
        if (!data) throw new Error("Data Pokémon tidak ditemukan");

        setPokemon(data);

        const myPokemons = JSON.parse(
          localStorage.getItem("myPokemons") || "[]"
        ) as { name: string; nickname: string }[];

        setIsCaught(myPokemons.some((p) => p.name === data.name));
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [name]);

  return { pokemon, loading, error, isCaught };
};
