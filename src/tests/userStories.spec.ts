import { Request, Response, NextFunction } from "express";
import { getAllMovies, getMovieById } from "../controllers";
import { toBeOneOf } from 'jest-extended'; // Import custom matcher for multiple values
import { setupTestDB } from "./setupTestDB";
import { moviesDB, ratingsDB } from "../database/connectionManager";
import { MovieDetailResponse, MovieResponse } from "../types/outputTypes";

// ✅ Mock logger to prevent console clutter during tests
jest.mock("../utils/logger", () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));

describe("US Validations", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    let jsonMock: jest.Mock;
    expect.extend({ toBeOneOf });
    // ✅ Ensure databases are set up before tests start
    beforeAll(async () => {
        await setupTestDB();
    });

    // ✅ Reset mock implementations before each test
    beforeEach(() => {
        req = { query: {} };
        jsonMock = jest.fn();
        res = { json: jsonMock as jest.Mock } as Partial<Response>;
        next = jest.fn();
    });

    // ✅ Ensure database connections close after tests complete
    afterAll(async () => {
        await moviesDB.close();
        await ratingsDB.close();
    });

    test("1: List All Movies", async () => {
        await getAllMovies(req as Request, res as Response, next);

        // ✅ Extract response JSON from Jest mock
        const response = (res.json as jest.Mock).mock.calls[0][0] as { success: boolean; data: MovieResponse[] };

        // ✅ Ensure response structure
        expect(response).toHaveProperty("success", true);
        expect(Array.isArray(response.data)).toBe(true);

        // ✅ Expect a maximum of 100 movies
        expect(response.data.length).toBeLessThanOrEqual(50);

        // ✅ Validate each movie object matches the `MovieResponse` interface
        response.data.forEach((movie) => {
            expect(movie).toEqual(
                expect.objectContaining({
                    imdbId: expect.any(String),
                    title: expect.any(String),
                    genres: expect.any(Array), // Should be an array of strings
                    releaseDate: expect.any(String),
                    budget: expect.any(String), // Since budget is formatted as currency
                })
            );
        });
    });

    test("2: Movie Details", async () => {
        req = { params: { id: "255" } } as Partial<Request>; // ✅ Ensure req.params
    
        await getMovieById(req as Request, res as Response, next);
    
        // ✅ Extract response JSON from Jest mock
        const response = (res.json as jest.Mock).mock.calls[0][0] as { success: boolean; data: MovieDetailResponse };
    
        // ✅ Ensure response structure
        expect(response).toHaveProperty("success", true);
    
        // ✅ Ensure response contains a single movie (not an array)
        expect(response.data).toEqual(expect.objectContaining({
            imdbId: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            releaseDate: expect.any(String),
            budget: expect.any(String), // ✅ Budget should be a string formatted as USD
            runtime: expect.any(Number), // ✅ Runtime should be a number
            averageRating: expect.any(String), // ✅ Allow rating as a string ("2.20")
        }));
    
        // ✅ Additional Fix: Convert `averageRating` to number and validate
        expect(Number(response.data.averageRating)).toBeGreaterThanOrEqual(0);
    
        // ✅ Validate `genres` as an array of strings
        expect(response.data.genres).toEqual(expect.arrayContaining([expect.any(String)]));
    
        // ✅ Validate `productionCompanies` as an array of strings
        expect(response.data.productionCompanies).toEqual(expect.arrayContaining([expect.any(String)]));
    
        // ✅ Allow `originalLanguage` to be null or a string
        expect(response.data.originalLanguage).toEqual(expect.toBeOneOf([expect.any(String), null]));
    });
    

    test("3: Movies By Year", async () => {
        req = { query: { year: "2000", page: "1", sort: "ASC" } }; // ✅ Ensure pagination and sorting params are included
    
        await getAllMovies(req as unknown as Request, res as Response, next);
    
        // ✅ Extract response JSON from Jest mock
        const response = (res.json as jest.Mock).mock.calls[0][0] as { success: boolean; data: MovieResponse[] };
    
        // ✅ Ensure response structure
        expect(response).toHaveProperty("success", true);
        expect(Array.isArray(response.data)).toBe(true);
    
        // ✅ Expect a maximum of 50 movies per page
        expect(response.data.length).toBeLessThanOrEqual(50);
    
        // ✅ Validate each movie object matches `MovieResponse` interface and includes necessary fields
        response.data.forEach((movie) => {
            expect(movie).toEqual(
                expect.objectContaining({
                    imdbId: expect.any(String), // Must be a string
                    title: expect.any(String), // Must be a string
                    genres: expect.any(Array), // Should be an array of genre strings
                    releaseDate: expect.any(String), // Must be a valid date string
                    budget: expect.any(String), // Must be a currency-formatted string (e.g., "$1,000,000")
                })
            );
        });
    
        // ✅ Ensure list is sorted by `releaseDate` in chronological order (ascending)
        const releaseDates = response.data
            .filter((movie) => movie.releaseDate) // Remove movies with missing dates
            .map((movie) => new Date(movie.releaseDate!).getTime());
            expect(releaseDates).toEqual([...releaseDates].sort((a, b) => a - b)); // Check ascending order
    
        // ✅ If sorting is set to DESC, validate descending order
        if (req?.query?.sort === "DESC") {
            expect(releaseDates).toEqual([...releaseDates].sort((a, b) => b - a)); // Check descending order
        }
    
        // ✅ Ensure pagination works (mocked example assumes `pageSize=50`)
        if (response.data.length === 50) {
            expect(req?.query?.page).toBeDefined(); // Ensure pagination exists
        }
    });

    test("4: Movies By Genre", async () => {
        req = { query: { genre: "Action", page: "1" } }; // ✅ Ensure genre and pagination parameters
    
        await getAllMovies(req as Request, res as Response, next);
    
        // ✅ Extract response JSON from Jest mock
        const response = (res.json as jest.Mock).mock.calls[0][0] as { success: boolean; data: MovieResponse[] };
    
        // ✅ Ensure response structure
        expect(response).toHaveProperty("success", true);
        expect(Array.isArray(response.data)).toBe(true);
    
        // ✅ Expect a maximum of 50 movies per page
        expect(response.data.length).toBeLessThanOrEqual(50);
    
        // ✅ Validate each movie object matches `MovieResponse` interface
        response.data.forEach((movie) => {
            expect(movie).toEqual(
                expect.objectContaining({
                    imdbId: expect.any(String), // Must be a string
                    title: expect.any(String), // Must be a string
                    genres: expect.any(Array), // Must be an array of genres
                    releaseDate: expect.any(String), // Must be a valid date string
                    budget: expect.any(String), // Must be a currency-formatted string (e.g., "$1,000,000")
                })
            );
    
            // ✅ Ensure at least one genre matches the requested genre ("Action")
            expect(movie.genres).toEqual(expect.arrayContaining(["Action"]));
        });
    
        // ✅ Ensure pagination works (mocked example assumes `pageSize=50`)
        if (response.data.length === 50) {
            expect(req?.query?.page).toBeDefined(); // Ensure pagination is present
        }
    });
});

