import { BASE_URL } from "../configs";
import {
  PokemonList,
  Detail,
  PokemonSpecies,
  PokemonType,
} from "../type_definition";

export const getListOfPokemon = async (
  nextUrl: string,
): Promise<PokemonList> => {
  let url = `${BASE_URL}/pokemon`;
  if (nextUrl !== "") url = nextUrl;

  const response = await (await fetch(url)).json();
  return response;
};

export const getPokemonDetail = async (name: string): Promise<Detail> => {
  const response = await (await fetch(`${BASE_URL}/pokemon/${name}`)).json();
  return response;
};

export const getPokemonSpecies = async (
  name: string,
): Promise<PokemonSpecies> => {
  const response = await (
    await fetch(`${BASE_URL}/pokemon-species/${name}`)
  ).json();
  return response;
};

export const getPokemonByType = async (type: string): Promise<PokemonType> => {
  const response = await (await fetch(`${BASE_URL}/type/${type}`)).json();
  return response;
};
