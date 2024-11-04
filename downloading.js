import fs from "fs/promises";
import path from "path";
import { fetchAllData } from "./fetching/pokeDataFetcher.js";

// console.log(process.cwd());

const createFolder = async (folderName) => {
  const folderPath = path.join(process.cwd(), folderName);
  try {
    //folder exists
    await fs.access(folderPath);
  } catch (error) {
    // folder doesn't exist
    fs.mkdir(folderPath);
  }
};

const createTextFile = async (fileName, insideFile) => {
  await fs.writeFile(`${fileName}.txt`, insideFile);
};

const createImageFile = async (fileName, imageBuffer) => {
  try {
    await fs.writeFile(`${fileName}.png`, Buffer.from(imageBuffer));
  } catch (error) {
    console.error(`Error saving image ${fileName}: ${error.message}`);
  }
};

const { sprites, artwork, stats } = await fetchAllData("pikachu");
// console.log(sprites.get("back_default"));

const savePokemonStats = async (folderName, pokeStatsObj) => {
  let statsString = "";
  for (const [statName, num] of Object.entries(pokeStatsObj)) {
    statsString += `${statName}: ${num}\n`;
  }
  await createFolder(folderName);
  const filePath = path.join(process.cwd(), folderName, "stats");
  await createTextFile(filePath, statsString);
};
// savePokemonStats("pikachu", stats);

const savePokemonSprites = async (folderName, pokeSpritesObject) => {
  await createFolder(folderName);
  for (const [key, value] of pokeSpritesObject) {
    const imagePath = path.join(process.cwd(), folderName, `${key}.png`);
    await createImageFile(imagePath, value);
  }
};

// savePokemonSprites("pikachu", sprites);