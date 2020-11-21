import React, { useEffect, useState } from "react";
import { padNumber, symbol } from "../utils";
import { Detail, PokemonSpecies } from "../type_definition";
import { getPokemonDetail, getPokemonSpecies } from "../apis";
import "../assets/css/detail.css";

type Props = {
  pokemonId: string;
  pokemonName: string;
  onHideDetail: () => void;
};

function PokemonDetail({ pokemonId, pokemonName, onHideDetail }: Props) {
  const [detail, setDetail] = useState<Detail>();
  const [species, setSpecies] = useState<PokemonSpecies>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const requestPokemonDetailAndSpecies = async () => {
      try {
        setLoading(true);
        const [pokemonDetail, pokemonSpecies] = await Promise.all([
          await getPokemonDetail(pokemonName),
          await getPokemonSpecies(pokemonName),
        ]);

        setDetail(pokemonDetail);
        setSpecies(pokemonSpecies);
      } catch (error) {
        alert("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    requestPokemonDetailAndSpecies();
  }, [pokemonName]);

  const genera = species?.genera.find((g) => {
    if (g.language.name === "en") return g.genus;
    return null;
  });

  return (
    <div
      data-testid="detail-pokemon"
      className="detail-wrapper"
      onClick={onHideDetail}
    >
      <div className="detail-content">
        {isLoading ? (
          <h2 className="loading">Getting your pokemon information...</h2>
        ) : (
          <>
            <h2 className="name">
              {pokemonName}{" "}
              <span className="number">#{padNumber(detail?.id, 3)}</span>
            </h2>

            <div className="top">
              <div className="image-wrapper">
                <img
                  src={`https://pokeres.bastionbot.org/images/pokemon/${
                    pokemonId ? pokemonId : detail?.id
                  }.png`}
                  alt=""
                />
              </div>

              <div className="description-wrapper">
                <p className="description">
                  {
                    species?.flavor_text_entries.find(
                      (f) => f.language.name === "en",
                    )?.flavor_text
                  }
                </p>

                <div className="details">
                  <p className="height">
                    <span>Height</span>
                    {detail?.height} dm
                  </p>
                  <p className="weight">
                    <span>Weight</span>
                    {detail?.weight} hg
                  </p>
                  <p className="genus">
                    <span>Genus</span>
                    {genera?.genus}
                  </p>
                  <p className="abilities">
                    <span>Abilities</span>

                    {detail?.abilities.map((a) => {
                      return (
                        <span className="ability" key={a.ability.name}>
                          {a.ability.name.replace("-", " ")}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="type-wrapper">
              <h3>Type</h3>
              <ul className="types">
                {detail?.types.map((t) => {
                  return (
                    <li key={t.type.name}>
                      <span>{t.type.name}</span>
                      <img src={symbol(t.type.name)} alt="" />
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="stats-wrapper">
              <h3>Base Stats</h3>
              <ul className="stats">
                {detail?.stats.map((s) => {
                  return (
                    <li key={s.stat.name}>
                      <span>{s.stat.name.replace("-", " ")}</span>
                      <span style={{ width: s.base_stat }}>{s.base_stat}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PokemonDetail;
