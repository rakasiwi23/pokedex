import React, { useEffect } from "react";
import { getListOfPokemon } from "../services/apis";
import "../assets/css/app.css";

function App() {
  useEffect(() => {
    const requestPokemons = async () => {
      const response = await getListOfPokemon("");
      console.log(response);
    };

    requestPokemons();
  }, []);

  return <div className="app">List of Pokemon goes here...</div>;
}

export default App;
