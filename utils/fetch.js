const log = console.log;
const fetchPokemon = async (pokemonName) => {
  try {
    const pokeUrl = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
    );
    if (!pokeUrl.ok) throw new Error("Endpoint failed");
    return await pokeUrl.json();
  } catch (error) {
    console.error(error);
  }
};

const fetchStats = async (data) => {
  const pokemon = data; // expecting json
  const stats = pokemon.stats;
  const statsObject = {};
  for (const {
    stat: { name },
    base_stat,
  } of stats) {
    statsObject[name] = base_stat;
  }
  return statsObject;
};

const fetchSprites = async (data) => {
  const pokemon = data; // expecting json
  const sprites = pokemon.sprites;
  const imagesMap = new Map();
  for (const [key, value] of Object.entries(sprites)) {
    if (imagesMap.size < 8) {
      imagesMap.set(key, value);
    }
  }
  return imagesMap;
};

const fetchArtwork = async (data) => {
  const pokemon = data; // expecting json
  const artworkObject = pokemon.sprites.other["official-artwork"].front_default;
  return artworkObject;
};

export { fetchArtwork, fetchPokemon, fetchSprites, fetchStats };
