import inquirer from "inquirer";
import {
  savePokemonArtwork,
  savePokemonSprites,
  savePokemonStats,
} from "../downloading.js";
import { fetchAllData } from "../fetching/pokeDataFetcher.js";

const inquirePokemon = async () => {
  // inquirer.prompt returns a promise
  const result = await inquirer.prompt({
    type: "input",
    message: "Enter a Pokemon name:",
    name: "pokemon_name",
  });
  result.pokemon_name = result.pokemon_name.toLowerCase();
  return result;
};

const inquireInfo = async () => {
  return await inquirer.prompt({
    type: "checkbox",
    name: "options",
    message: "Select information you'd like to download",
    choices: [
      new inquirer.Separator("-- Options --"),
      { name: "Stats" },
      { name: "Sprites" },
      { name: "Artwork" },
    ],
    validate(answer) {
      if (answer.length === 0) {
        return "You must choose at least on option";
      }
      return true;
    },
  });
};

const inquireToContinue = async () => {
  return inquirer.prompt({
    type: "list",
    name: "continue",
    message: "Look for another Pokemon?",
    choices: ["Yes", "No"],
  });
};

const promptUser = async () => {
  while (true) {
    const pokemonName = await inquirePokemon();
    const pokemonNameString = pokemonName.pokemon_name;
    const fetchedPokemon = await fetchAllData(pokemonName.pokemon_name);
    const { stats, sprites, artwork } = fetchedPokemon;
    const pokemonInfo = await inquireInfo();

    if (pokemonInfo.options.includes("Stats")) {
      await savePokemonStats(pokemonNameString, stats);
    }

    if (pokemonInfo.options.includes("Sprites")) {
      await savePokemonSprites(pokemonNameString, sprites);
    }

    if (pokemonInfo.options.includes("Artwork")) {
      await savePokemonArtwork(pokemonNameString, artwork);
    }

    const keepAskingUser = await inquireToContinue();
    if (keepAskingUser.continue === "No") break;
  }
};
export { promptUser };
