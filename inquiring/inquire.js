import inquirer from "inquirer";
import {
  savePokemonArtwork,
  savePokemonSprites,
  savePokemonStats,
} from "../downloading.js";
import { fetchAllData } from "../fetching/pokeDataFetcher.js";

const isValidPokemonName = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const inquirePokemon = async () => {
  let valid = false;
  let pokemonName = "";
  while (!valid) {
    // inquirer.prompt returns a promise
    const result = await inquirer.prompt({
      type: "input",
      message: "Enter a Pokemon name:",
      name: "pokemon_name",
      //check to see if input.trim(), which removes white spaces, is an empty string, if it is, returns error message
      validate: async (input) => {
        const trimmedInput = input.trim();
        if (trimmedInput === "") {
          return "Pokemon name cannot be empty.";
        }

        // Validate the Pokemon name against the API
        const isValid = await isValidPokemonName(trimmedInput.toLowerCase());
        if (isValid) {
          valid = true;
          return true;
        } else {
          return "Please enter a valid Pokemon name.";
        }
      },
    });

    pokemonName = result.pokemon_name.trim().toLowerCase();
  }
  return pokemonName;
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
    const fetchedPokemon = await fetchAllData(pokemonName);
    const { stats, sprites, artwork } = fetchedPokemon;
    const pokemonInfo = await inquireInfo();

    if (pokemonInfo.options.includes("Stats")) {
      await savePokemonStats(pokemonName, stats);
    }

    if (pokemonInfo.options.includes("Sprites")) {
      await savePokemonSprites(pokemonName, sprites);
    }

    if (pokemonInfo.options.includes("Artwork")) {
      await savePokemonArtwork(pokemonName, artwork);
    }

    const keepAskingUser = await inquireToContinue();
    if (keepAskingUser.continue === "No") break;
  }
};
export { promptUser };
