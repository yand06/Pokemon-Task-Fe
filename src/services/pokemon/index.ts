import type {
  Ability,
  Move,
  Stat,
  Type,
  PokemonDetail,
  PokemonListResponse,
  Pokemon,
  MyPokemon,
  PokemonWithNickname,
} from "./type";
import {
  getPokemons,
  getPokemonByName,
  getPokemonDetail,
  getMyPokemons,
  catchPokemon,
  removeMyPokemon,
} from "./api";

export {
  getPokemons,
  getPokemonByName,
  getPokemonDetail,
  getMyPokemons,
  catchPokemon,
  removeMyPokemon,
};
export type {
  Ability,
  Move,
  Stat,
  Type,
  PokemonDetail,
  PokemonListResponse,
  Pokemon,
  MyPokemon,
  PokemonWithNickname,
};
