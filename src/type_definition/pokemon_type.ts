import { Pokemon as Pokemon2 } from "./pokemon_species";

export type PokemonType = {
  id: number;
  name: string;
  pokemon: PokemonListByType[];
};

export type PokemonListByType = {
  pokemon: Pokemon2;
  slot: number;
};
