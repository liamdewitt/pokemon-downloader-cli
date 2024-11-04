import inquirer from "inquirer";
import { fetchAllData } from "../fetching/pokeDataFetcher.js";

const inquirePokemon = async () => {
  // inquirer.prompt returns a promise
  const result = await inquirer.prompt({
    type: "input",
    message: "Enter a Pokemon name:",
    name: "pokemon_name",
    default() {
      return "Pikachu"; // will default to 'pikachu' if user doesn't pick a pokemon
    },
  });
  result.pokemon_name = result.pokemon_name.toLowerCase();
  return result;
};
// inquirePokemon();

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
  // .then((answers) => {
  //   console.log(answers);
  // });
};
// inquireInfo();

const inquireToContinue = async () => {
  return inquirer.prompt({
    type: "list",
    name: "continue",
    message: "Look for another Pokemon?",
    choices: ["Yes", "No"],
  });
};
// inquireToContinue();

const promptUser = async () => {
  while (true) {
    const pokemonName = await inquirePokemon();
    const fetchedPokemon = await fetchAllData(pokemonName.pokemon_name);
    const { stats, sprites, artwork } = fetchedPokemon;
    // console.log(stats);
    const pokemonInfo = await inquireInfo();
    if (pokemonInfo.options.includes("Stats")) console.log(stats);
    if (pokemonInfo.options.includes("Sprites")) console.log(sprites);
    if (pokemonInfo.options.includes("Artwork")) console.log(artwork);

    const keepAskingUser = await inquireToContinue();
    if (keepAskingUser.continue === "No") break;
  }
};
promptUser();
// export { inquireToContinue };
