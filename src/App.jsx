import { useState, useEffect } from 'react'
import './App.css'

function App() {
const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=5`);
        const data = await response.json();

        // Fetch additional details for each Pokemon
        const detailsPromises = data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const details = await response.json();
          return { ...pokemon, details };
        });

        // Resolve all promises and set the updated data
        const updatedPokemonData = await Promise.all(detailsPromises);
        setPokemonData(updatedPokemonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [offset]);

  const handleLoadMoreClick = () => {
    setOffset(offset + 5);
  };

  return (
    <div className="App">
      <h1>Pokemon Data</h1>
      <ul>
        {pokemonData.map((pokemon, index) => (
          <li key={index}>
            <p>Name: {pokemon.name}</p>
            <p>Height: {pokemon.details.height}</p>
            <p>Weight: {pokemon.details.weight}</p>
            <p>Abilities: {pokemon.details.abilities.map(ability => ability.ability.name).join(', ')}</p>
          </li>
        ))}
      </ul>
      <button className='button' onClick={handleLoadMoreClick}>Load More Pokemon Friends</button>
    </div>
  
);

}

export default App
