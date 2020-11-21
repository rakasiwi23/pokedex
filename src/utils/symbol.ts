import normal from "../assets/images/normal.png";
import poison from "../assets/images/poison.png";
import ground from "../assets/images/ground.png";
import rock from "../assets/images/rock.png";
import bug from "../assets/images/bug.png";
import ghost from "../assets/images/ghost.png";
import fighting from "../assets/images/fighting.png";
import flying from "../assets/images/flying.png";
import steel from "../assets/images/steel.png";
import water from "../assets/images/water.png";
import grass from "../assets/images/grass.png";
import electric from "../assets/images/electric.png";
import psychic from "../assets/images/psychic.png";
import ice from "../assets/images/ice.png";
import dragon from "../assets/images/dragon.png";
import dark from "../assets/images/dark.png";
import fairy from "../assets/images/fairy.png";
import fire from "../assets/images/fire.png";

export const symbol = (type: string) => {
  const symbol: { [key: string]: any } = {
    normal,
    fighting,
    flying,
    poison,
    ground,
    rock,
    bug,
    ghost,
    steel,
    fire,
    water,
    grass,
    electric,
    psychic,
    ice,
    dragon,
    dark,
    fairy,
  };

  return symbol[type];
};
