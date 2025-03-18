import { MovieInterface, MovieResponse } from "../../types/outputTypes";

//* Columns should include: imdb id, title, genres, release date, budget
export function formatMoviesResponse(movies: MovieInterface[]):MovieResponse[] {
    return movies.map((movie: MovieInterface) => ({
        imdbId: movie.imdbId,
        title: movie.title,
        genres: movie.genres && JSON.parse(movie?.genres).map((g: { name: any; }) => g.name), // Extract genre names
        releaseDate: movie.releaseDate,
        budget: movie.budget
        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.budget)
        : "N/A" // or can also be defaulted $0
    }));
};