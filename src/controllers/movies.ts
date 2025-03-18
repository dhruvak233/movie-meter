import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/customErrors";
import { MovieService } from "../services/movieServices";
import { formatMoviesResponse, formatGetMovieDetailResponse } from "../mappers/output";
import { RatingService } from "../services/ratingServices";
import { logger } from "../utils";

export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info("getAllMovies controller")
        const movieServices = new MovieService();
        const movies = await movieServices.getAllMoviesByFilters(req.query);
        if (!movies?.length) {
            throw new NotFoundError("No Movies Found");
        }
        res.json({ success: true, data: formatMoviesResponse(movies) });
    } catch (error) {
        console.log("error",error);
        logger.error(error);        
        next(error);
    }
};

export const getMovieById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info("getMovieById controller");
        const { id } = req.params;
        const movieServices = new MovieService();
        const movie= await movieServices.getMovieById(parseInt(id));

        if (!movie) {
            throw new NotFoundError("Movie not found");
        }

        const ratingService = new RatingService();
        const averageRating = await ratingService.getAverageRatingByMovieById(parseInt(id))

        res.json({
            success: true,
            data: formatGetMovieDetailResponse(movie, averageRating)

        });
    } catch (error) {
        logger.error(error);        
        next(error);
    }
};
