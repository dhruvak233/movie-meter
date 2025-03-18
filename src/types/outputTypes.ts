export interface MovieInterface {
    movieId: number;
    imdbId: string;
    title: string;
    overview?: string | null;
    productionCompanies?: string | null;
    releaseDate?: string | null;
    budget?: number | null;
    revenue?: number | null;
    runtime?: number | null;
    language?: string | null;
    genres?: string | null; // Assuming it's a JSON string
    status?: string | null;
}

export interface RatingInterface {
    ratingId: number;
    userId: number;
    movieId: number;
    rating: number; // Assuming a decimal rating (0-10 or 0-5 scale)
    timestamp: number; // UNIX timestamp
}

export interface MovieDetailResponse {
    imdbId: string;
    title: string;
    description?: string | null;
    releaseDate?: string | null;
    budget: string; // Formatted as currency ($xx,xxx,xxx)
    runtime?: number | null;
    averageRating: number | string; // Can be a number or "N/A"
    genres?: string[] | null; // Array of genre names
    originalLanguage?: string | null;
    productionCompanies?: string[] | null; // Array of production company names
}


export interface MovieResponse {
    imdbId: string;
    title: string;
    genres?: string[] | null; // Array of genre names or null if no genres
    releaseDate?: string | null;
    budget: string; // Formatted as currency (e.g., "$36,000,000" or "N/A")
}
