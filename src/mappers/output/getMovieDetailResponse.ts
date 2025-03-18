import { MovieDetailResponse, MovieInterface } from "../../types/outputTypes";

//* Details should include: imdb id, title, description, release date, budget, runtime, average rating, genres, original language, production companies
export function formatGetMovieDetailResponse(movie: MovieInterface, averageRating: any):MovieDetailResponse {
    return  {
        imdbId: movie.imdbId,
        title: movie.title,
        description: movie.overview,
        releaseDate: movie.releaseDate,
        budget: movie.budget
        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.budget)
        : "N/A", // or can also be defaulted $0
        runtime: movie.runtime,
        averageRating: averageRating,
        genres: movie.genres && JSON.parse(movie.genres).map((g: { name: any; }) => g.name),
        originalLanguage: movie.language,
        productionCompanies: movie.productionCompanies && JSON.parse(movie.productionCompanies).map((c: { name: any; }) => c.name),

    };
}