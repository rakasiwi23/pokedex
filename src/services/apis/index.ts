import { BASE_URL } from "../../configs";
import { PokemonList } from "../../type_definition";

export const getListOfPokemon = async (
  nextUrl: string,
): Promise<PokemonList> => {
  let url = `${BASE_URL}/pokemon`;
  if (nextUrl !== "") url = nextUrl;

  const response = await (await fetch(url)).json();
  return response;
};
