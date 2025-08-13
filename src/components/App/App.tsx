import { SearchBar } from "../SearchBar/SearchBar"
import css from "./App.module.css"
import toast, { Toaster } from "react-hot-toast";
import { useState } from 'react'
import type { Movie } from "../../types/movie"
import { MovieGrid } from "../MovieGrid/MovieGrid"
import { Loader } from "../Loader/Loader"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import { fetchMovies } from "../../services/movieService"
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = async (newQuery: string) => {
    try {
      setMovies([]);
     setIsLoading(true);
      setIsError(false)
      const newMovies = await fetchMovies(newQuery)
      setMovies(newMovies) 
      if (newMovies.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch {
      setIsError(true)
    } finally {
 setIsLoading(false);
    }  
  }
   const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const closeModal = () => {
    setSelectedMovie(null);
  };


  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="top-center" />
      {isLoading ? (
        <Loader />
      ) : (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {isError && <ErrorMessage />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
    
  )
}

export default App
