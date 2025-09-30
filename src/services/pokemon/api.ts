import API from "../api";
import type {
  PokemonDetail,
  PokemonListResponse,
  Pokemon,
  MyPokemon,
  PokemonWithNickname,
} from "./type";

export const getPokemons = async (
  offset = 0,
  limit = 20
): Promise<PokemonDetail[] | undefined> => {
  try {
    const res = await API.get<PokemonListResponse>(
      `?offset=${offset}&limit=${limit}`
    );

    const data = res.data;

    const details = await Promise.all(
      data.results.map(async (pokemon: Pokemon) => {
        const detailRes = await API.get<PokemonDetail>(pokemon.url);
        const detailData = detailRes.data;

        return {
          id: detailData.id,
          name: detailData.name,
          types: detailData.types,
        } as PokemonDetail;
      })
    );

    return details;
  } catch (error: any) {
    console.error("Failed to fetch Pokémon:", error);
    return undefined;
  }
};

export const getPokemonByName = async (
  name: string
): Promise<PokemonDetail | undefined> => {
  try {
    const res = await API.get<PokemonDetail>(`/${name}`);
    return {
      id: res.data.id,
      name: res.data.name,
      types: res.data.types,
    } as PokemonDetail;
  } catch (error: any) {
    console.error("Failed to fetch Pokémon by name:", error);
    return undefined;
  }
};

export const getPokemonDetail = async (
  name: string
): Promise<PokemonDetail | undefined> => {
  try {
    const res = await API.get<PokemonDetail>(`/${name.toLowerCase()}`);
    return res.data;
  } catch (error: any) {
    console.error("Failed to fetch Pokémon detail:", error);
    return undefined;
  }
};

export const getMyPokemons = async (): Promise<PokemonWithNickname[]> => {
  const stored = JSON.parse(
    localStorage.getItem("myPokemons") || "[]"
  ) as MyPokemon[];

  if (stored.length === 0) return [];

  const results = await Promise.all(
    stored.map(async (p) => {
      const res = await API.get<PokemonDetail>(`/${p.name}`);
      const data = res.data; // ambil data langsung dari axios

      return {
        id: data.id,
        name: data.name,
        types: data.types,
        nickname: p.nickname,
      } as PokemonWithNickname;
    })
  );

  return results;
};

export const catchPokemon = (
  pokemon: PokemonDetail,
  nickname: string
): boolean => {
  const myPokemons = JSON.parse(localStorage.getItem("myPokemons") || "[]") as {
    id: number;
    name: string;
    nickname: string;
  }[];

  // Validasi nickname unik
  if (
    myPokemons.find((p) => p.nickname.toLowerCase() === nickname.toLowerCase())
  ) {
    return false;
  }

  myPokemons.push({ id: pokemon.id, name: pokemon.name, nickname });
  localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
  return true;
};

// Hapus Pokémon berdasarkan nickname
export const removeMyPokemon = (nickname: string) => {
  const stored = JSON.parse(
    localStorage.getItem("myPokemons") || "[]"
  ) as MyPokemon[];
  const updated = stored.filter((p) => p.nickname !== nickname);
  localStorage.setItem("myPokemons", JSON.stringify(updated));
  return updated;
};
