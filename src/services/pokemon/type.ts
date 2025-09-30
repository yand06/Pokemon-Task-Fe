export type Pokemon = {
  name: string;
  url: string;
};

// export type PokemonDetail = {
//   id: number;
//   name: string;
//   types: { type: { name: string } }[];
// };

export type Ability = { ability: { name: string; url: string } };
export type Move = { move: { name: string; url: string } };
export type Stat = { base_stat: number; stat: { name: string } };
export type Type = { type: { name: string } };

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  moves: Move[];
  stats: Stat[];
  types: Type[];
};

export type PokemonListResponse = {
  count: number;
  results: Pokemon[];
};

export interface MyPokemon {
  id: number;
  name: string;
  nickname: string;
}

export interface PokemonWithNickname extends PokemonDetail {
  nickname: string;
}
