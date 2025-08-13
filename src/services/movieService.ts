import axios from "axios"
import { Movie } from "../types/movie"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const IMAGE_SIZE = "original";

interface  GetMoviesResponse {
results: Movie[]
}

export async function fetchMovies(query: string) {
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
    
export function getImageUrl(path: string) {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${IMAGE_SIZE}${path}`;
}