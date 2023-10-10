import React, { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

// fa24a37c
const apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=fa24a37c';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies('Spiderman');
  }, []);

  const searchMovies = async (title) => {
    const res = await fetch(`${apiUrl}&s=${title}`);
    const data = await res.json();

    setMovies(data.Search);
  }

  return (
    <div className="App">
      <h1>MovieLand</h1>

      <div className='search'>
        <input onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search for movies...' value={searchTerm} />
        <img src={SearchIcon} alt='SearchIcon' onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies.length > 0 ? (
        <div class='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
          <p>Try searching for another movie</p>
        </div>
      )
      }
    </div>
  );
}

export default App;
