import fs from "fs/promises";
import path from "path";

const createFolder = async (folderName) => {
  const folderPath = path.join(process.cwd(), folderName);
  try {
    //folder exists
    await fs.access(folderPath);
  } catch (error) {
    // folder doesn't exist
    await fs.mkdir(folderPath);
  }
};

const createTextFile = async (fileName, insideFile) => {
  await fs.writeFile(`${fileName}`, insideFile);
};

const createImageFile = async (fileName, imageBuffer) => {
  await fs.writeFile(`${fileName}.png`, Buffer.from(imageBuffer));
};

const savePokemonStats = async (folderName, pokeStatsObj) => {
  await createFolder(folderName);
  let statsString = "";
  for (const [statName, num] of Object.entries(pokeStatsObj)) {
    statsString += `${statName}: ${num}\n`;
  }
  // checks for folder name in current path and adds filename
  const filePath = path.join(process.cwd(), folderName, "stats.txt");
  await createTextFile(filePath, statsString);
};

const savePokemonSprites = async (folderName, pokeSpritesObject) => {
  await createFolder(folderName);
  for (const [key, value] of pokeSpritesObject) {
    // checks for folder name in current path and adds filename
    const imagePath = path.join(process.cwd(), folderName, `${key}.png`);
    await createImageFile(imagePath, value);
  }
};

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

export { savePokemonArtwork, savePokemonSprites, savePokemonStats };
