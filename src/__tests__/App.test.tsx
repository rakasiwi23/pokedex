import React from "react";
import { act, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "fetch-mock";

import App from "../components/App";
import { BASE_URL } from "../configs";
import {
  pokemonList,
  pokemonDetail,
  pokemonSpecies,
} from "../mocks/api_response";

afterAll(() => {
  fetchMock.restore();
});

const renderComponent = () => render(<App />);
fetchMock
  .restore()
  .mock(`${BASE_URL}/pokemon`, pokemonList)
  .mock(`${BASE_URL}/pokemon/charizard`, pokemonDetail)
  .mock(`${BASE_URL}/pokemon-species/charizard`, pokemonSpecies);

test("should renders list of pokemon", async () => {
  const { getAllByTestId } = renderComponent();

  await act(async () => {
    const pokemonNames = await waitFor(() => {
      const names = getAllByTestId("pokemon-name").map((li) => li.innerHTML);

      return names;
    });

    const mockedPokemonNames = pokemonList.results.map((r) => r.name);

    expect(pokemonNames).toEqual(mockedPokemonNames);
  });
});

test('should show "Pokemon Detail"', async () => {
  const { getByTestId, getByText } = renderComponent();

  await act(async () => {
    const charizard = await waitFor(() => {
      return getByText(/charizard/i);
    });

    fireEvent.click(charizard);

    const detailPokemon = getByTestId("detail-pokemon");

    expect(detailPokemon).toBeInTheDocument();
  });
});
