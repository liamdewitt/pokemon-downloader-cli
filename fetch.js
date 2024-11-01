const log = console.log;

fetchAllData = async (poke) => {};

const fetchPokemon = async (pokemonName) => {
  const pokeData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
  );
  const data = await pokeData.json();
  const stats = data.stats;
  for (const {
    stat: { name },
    base_stat,
  } of stats) {
    // log(`${name}: ${base_stat}`);
  }

  // log(Object.keys(data));
  // log(data.sprites);
  //----------------------------------sprites
  const sprites = data.sprites;
  const images = [];

  for ([key, value] of Object.entries(sprites).slice(0, 8)) {
    images.push(key, value);
  }
  // log(images);
  //----------------------------------sprites

  //----------------------------------official-artwork
  const artwork = sprites.other["official-artwork"].front_default;
  log(artwork);
  //----------------------------------official-artwork
};

fetchPokemon("pikachu");

// const fetchStats = async (jsonResponse) => {
//   const pokeData = await fetch(jsonResponse);
//   const stats = data.stats;
//   for (const {
//     stat: { name },
//     base_stat,
//   } of stats) {
//     return `${name}: ${base_stat}`;
//   }
//   log(stats);
// };

/*
  loop through stats and pull:
    stat.name => string
    base_stat => num
*/
