import inquirer from "inquirer";

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
      // { name: "hp" },
      // { name: "attack" },
      // { name: "defense" },
      // { name: "special" },
      // { name: "special-defense" },
      // { name: "speed" },
    ],
  });
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

export { inquireInfo, inquirePokemon, inquireToContinue };
