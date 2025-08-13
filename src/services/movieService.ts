import axios from "axios"
import { Movie } from "../types/movie"

interface  GetMoviesResponse {
results: Movie[]
}

export async function fetchMovies(query: string): Promise<Movie[]> {
        const response = await axios.get<GetMoviesResponse>("https://api.themoviedb.org/3/search/movie",
            {
                params: {
                    query,
                },
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                },
            });
        return response.data.results;
}
    
