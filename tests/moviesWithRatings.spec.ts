import { Request, Response, NextFunction } from "express";
import { getMovieById } from "../src/controllers";
import { toBeOneOf } from 'jest-extended';
import { setupTestDB } from "./setupTestDB";
import { moviesDB, ratingsDB } from "../src/database/connectionManager";
import { MovieDetailResponse } from "../src/types/outputTypes";

jest.mock("../src/utils/logger", () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));

describe("get movies by ID end to end testing", () => {
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

    test("User story 2: Movie Details", async () => {
        req = { params: { id: "255" } } as Partial<Request>;
        await getMovieById(req as Request, res as Response, next);
        const response = (res.json as jest.Mock).mock.calls[0][0] as { success: boolean; data: MovieDetailResponse };

        expect(response).toHaveProperty("success", true);
        expect(response.data).toEqual(expect.objectContaining({
            imdbId: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            releaseDate: expect.any(String),
            budget: expect.any(String),
            runtime: expect.any(Number),
            averageRating: expect.any(String),
        }));

        expect(Number(response.data.averageRating)).toBeGreaterThanOrEqual(0);
        expect(response.data.genres).toEqual(expect.arrayContaining([expect.any(String)]));
        expect(response.data.productionCompanies).toEqual(expect.arrayContaining([expect.any(String)]));
        expect(response.data.originalLanguage).toEqual(expect.toBeOneOf([expect.any(String), null]));
    });
});
