import {
  fetchArtwork,
  fetchPokemon,
  fetchSprites,
  fetchStats,
} from "./fetch.js";

const fetchAllData = async (pokemonName) => {
  const pokemonData = await fetchPokemon(pokemonName);
  const statsPromise = fetchStats(pokemonData);
  const spritesPromise = fetchSprites(pokemonData);
  const artworkPromise = fetchArtwork(pokemonData);

  const [stats, sprites, artwork] = await Promise.all([
    statsPromise,
    spritesPromise,
    artworkPromise,
  ]);
  return { pokemonData, stats, sprites, artwork };
};
export { fetchAllData };
