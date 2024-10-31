const log = console.log;

const fetchPokemon = async (name) => {
  const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
  const data = await pokeData.json();
  const stats = data.stats;
  log(stats);
};

fetchPokemon("pikachu");
/*
  loop through stats and pull:
    stat.name => string
    base_stat => num
*/
