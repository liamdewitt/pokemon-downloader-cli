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
  await fs.writeFile(`${fileName}`, insideFile);
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
  // checks for folder name in current path and adds filename
  const filePath = path.join(process.cwd(), folderName, "stats.txt");
  await createTextFile(filePath, statsString);
};
// savePokemonStats("pikachu", stats);

const savePokemonSprites = async (folderName, pokeSpritesObject) => {
  await createFolder(folderName);
  for (const [key, value] of pokeSpritesObject) {
    // checks for folder name in current path and adds filename
    const imagePath = path.join(process.cwd(), folderName, `${key}.png`);
    await createImageFile(imagePath, value);
  }
};
// savePokemonSprites("pikachu", sprites);

const savePokemonArtwork = async (folderName, pokeArtworkObject) => {
  await createFolder(folderName);
  // checks for folder name in current path and adds filename
  const imagePath = path.join(
    process.cwd(),
    folderName,
    `${folderName}OfficialArtwork.png`
  );
  await createImageFile(imagePath, pokeArtworkObject);
};
// savePokemonArtwork("pikachu", artwork);
