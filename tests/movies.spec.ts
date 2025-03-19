import { Request, Response, NextFunction } from "express";
import { getAllMovies } from "../src/controllers";
import { toBeOneOf } from 'jest-extended';
import { setupTestDB } from "./setupTestDB";
import { moviesDB, ratingsDB } from "../src/database/connectionManager";
import { MovieResponse } from "../src/types/outputTypes";

jest.mock("../src/utils/logger", () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));

describe("get All movies end to end testing", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    let jsonMock: jest.Mock;
    expect.extend({ toBeOneOf });

    beforeAll(async () => {
        await setupTestDB();
    });

    beforeEach(() => {
        req = { query: {} };
        jsonMock = jest.fn();
        res = { json: jsonMock as jest.Mock } as Partial<Response>;
        next = jest.fn();
    });

    afterAll(async () => {
        await moviesDB.close();
        await ratingsDB.close();
    });

    test("User Story 1: List All Movies", async () => {
        await getAllMovies(req as Request, res as Response, next);
        const response = (res.json as jest.Mock).mock.calls[0][0] as { success: boolean; data: MovieResponse[] };

        expect(response).toHaveProperty("success", true);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeLessThanOrEqual(50);

        response.data.forEach((movie) => {
            expect(movie).toEqual(
                expect.objectContaining({
                    imdbId: expect.any(String),
                    title: expect.any(String),
                    genres: expect.any(Array),
                    releaseDate: expect.any(String),
                    budget: expect.any(String),
                })
            );
        });
    });

    test("User Story 3: Movies By Year", async () => {
        req = { query: { year: "2000", page: "1", sort: "ASC" } };
        await getAllMovies(req as unknown as Request, res as Response, next);
        const response = (res.json as jest.Mock).mock.calls[0][0] as { success: boolean; data: MovieResponse[] };

        expect(response).toHaveProperty("success", true);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeLessThanOrEqual(50);

        response.data.forEach((movie) => {
            expect(movie).toEqual(
                expect.objectContaining({
                    imdbId: expect.any(String),
                    title: expect.any(String),
                    genres: expect.any(Array),
                    releaseDate: expect.any(String),
                    budget: expect.any(String),
                })
            );
        });

        const releaseDates = response.data
            .filter((movie) => movie.releaseDate)
            .map((movie) => new Date(movie.releaseDate!).getTime());
        expect(releaseDates).toEqual([...releaseDates].sort((a, b) => a - b));

        if (req?.query?.sort === "DESC") {
            expect(releaseDates).toEqual([...releaseDates].sort((a, b) => b - a));
        }

        if (response.data.length === 50) {
            expect(req?.query?.page).toBeDefined();
        }
    });

    test("User Story 4: Movies By Genre", async () => {
        req = { query: { genre: "Action", page: "1" } };
        await getAllMovies(req as Request, res as Response, next);
        const response = (res.json as jest.Mock).mock.calls[0][0] as { success: boolean; data: MovieResponse[] };

        expect(response).toHaveProperty("success", true);
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeLessThanOrEqual(50);

        response.data.forEach((movie) => {
            expect(movie).toEqual(
                expect.objectContaining({
                    imdbId: expect.any(String),
                    title: expect.any(String),
                    genres: expect.any(Array),
                    releaseDate: expect.any(String),
                    budget: expect.any(String),
                })
            );

            expect(movie.genres).toEqual(expect.arrayContaining(["Action"]));
        });

        if (response.data.length === 50) {
            expect(req?.query?.page).toBeDefined();
        }
    });
});
