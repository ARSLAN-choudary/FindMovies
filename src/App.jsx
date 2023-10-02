import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const APIURL = "http://www.omdbapi.com?apikey=78933460";
const movie1 = {
  Title: "Superman Returns",
  Year: "2006",
  imdbID: "tt0348150",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNDUzZGRhNzktYTZkMC00YWFiLTljMDEtMTk2OWJhYzAyYmY2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
};

function App() {
  const [movies, setMovies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("superman");
  //api code 78933460

  const searchMovies = async (title) => {
    const response = await fetch(`${APIURL}&s=${title}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    searchMovies(searchTerm)
    .then(res => setMovies(res.Search))
    .catch(error => console.log("ERROR", error))
  }, [searchTerm]);

  return (
    <div className="app">
      <h1>Find Movies</h1>
      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

         {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
      
      
    </div>
  );
}

export default App;
