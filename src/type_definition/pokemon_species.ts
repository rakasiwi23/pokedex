export type PokemonSpecies = {
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: EggGroup[];
  evolution_chain: EvolutionChain;
  evolves_from_species: any;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genera[];
  generation: Generation;
  growth_rate: GrowthRate;
  habitat: Habitat;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: Shape;
  varieties: Variety[];
};

export type Color = {
  name: string;
  url: string;
};

export type EggGroup = {
  name: string;
  url: string;
};

export type EvolutionChain = {
  url: string;
};

export type FlavorTextEntry = {
  flavor_text: string;
  language: Language;
  version: Version;
};

export type Language = {
  name: string;
  url: string;
};

export type Version = {
  name: string;
  url: string;
};

export type Genera = {
  genus: string;
  language: Language2;
};

export type Language2 = {
  name: string;
  url: string;
};

export type Generation = {
  name: string;
  url: string;
};

export type GrowthRate = {
  name: string;
  url: string;
};

export type Habitat = {
  name: string;
  url: string;
};

export type Name = {
  language: Language3;
  name: string;
};

export type Language3 = {
  name: string;
  url: string;
};

export type PalParkEncounter = {
  area: Area;
  base_score: number;
  rate: number;
};

export type Area = {
  name: string;
  url: string;
};

export type PokedexNumber = {
  entry_number: number;
  pokedex: Pokedex;
};

export type Pokedex = {
  name: string;
  url: string;
};

export type Shape = {
  name: string;
  url: string;
};

export type Variety = {
  is_default: boolean;
  pokemon: Pokemon;
};

export type Pokemon = {
  name: string;
  url: string;
};
