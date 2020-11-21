import { Pokemon } from "./pokemon_species";

export type PokemonList = {
  count: number;
  next: string;
  previous: any;
  results: Pokemon[];
};
