import { Movie } from "../database/model";
import { col, fn, Op, Order, Sequelize } from "sequelize";
import { queryParamsSchema } from "../schema/input";
import { logger, validateSchema } from "../utils";
import { QueryParams } from "../types";
import { MovieInterface } from "../types/outputTypes";

export class MovieService {
    constructor() { }

    async getMovieFiltersByParams(params: QueryParams) {
        const { page = 1, sort = "ASC", pageSize = 50, year, genre } = await validateSchema(queryParamsSchema, params);
        const filters: any = {};

        if (year) {
            filters[Op.and] = [
                Sequelize.where(fn("strftime", "%Y", col("releaseDate")), year.toString())
            ];
        }
        if (genre) {
            filters[Op.and] = filters[Op.and] || [];
            filters[Op.and].push(
                Sequelize.literal(`
                EXISTS (
                    SELECT 1 
                    FROM json_each(genres) AS g
                    WHERE g.value LIKE '%"name":"${genre}"%'
                )
            `)
            );
        }
        const offset = (page - 1) * pageSize; // Fix: Ensure correct pagination offset
        const order: Order = [["releaseDate", sort as "ASC" | "DESC"]];

        return {
            where: filters,
            order,
            limit: pageSize,
            offset
        };
    }

    async getAllMoviesByFilters(params = {}): Promise<MovieInterface[] | undefined> {
        try {
            logger.info("getAllMoviesByFilters service")
            const filters = await this.getMovieFiltersByParams(params);
            const movies = await Movie.findAll({ ...filters });
            logger.debug({ movies, filters })
            // Convert Sequelize instances to plain objects
            return movies.map(movie => movie.get({ plain: true })) as MovieInterface[];
        } catch (error) {
            console.log("error man", error);
            logger.error(error);
            throw new Error("Error while fetching Records")
        }

    }

    async getMovieById(id: number): Promise<MovieInterface | null | undefined> {
        try {
            const movie = await Movie.findByPk(id);
            logger.debug({ id });
            // Convert Sequelize instance to plain object
            return movie ? (movie.get({ plain: true }) as MovieInterface) : null;
        } catch (error) {
            logger.error(error);
            throw new Error("Error while fetching Records")
        }

    }
}
