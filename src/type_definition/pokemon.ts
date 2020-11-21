import { Version } from "./pokemon_species";

export type Detail = {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: Index[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Mfe[];
  name: string;
  order: number;
  species: SpeciesURL;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
};

export type Ability = {
  ability: Ability2;
  is_hidden: boolean;
  slot: number;
};

export type Ability2 = {
  name: string;
  url: string;
};

export type Form = {
  name: string;
  url: string;
};

export type Index = {
  game_index: number;
  version: Version;
};

export type Mfe = {
  move: Move;
  version_group_details: VersionGroupDetail[];
};

export type Move = {
  name: string;
  url: string;
};

export type VersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
};

export type MoveLearnMethod = {
  name: string;
  url: string;
};

export type VersionGroup = {
  name: string;
  url: string;
};

export type SpeciesURL = {
  name: string;
  url: string;
};

export type Sprites = {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: Stat2;
};

export type Stat2 = {
  name: string;
  url: string;
};

export type Type = {
  slot: number;
  type: Type2;
};

export type Type2 = {
  name: string;
  url: string;
};
