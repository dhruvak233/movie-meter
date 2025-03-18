import { Ratings } from "../database/model";
import { Sequelize } from "sequelize";
import { logger } from "../utils";


export class RatingService {
    constructor() {
    }

    async getAverageRatingByMovieById(id: number): Promise<string> {
        try {
            logger.info("getAverageRatingByMovieById");
            const ratings = await Ratings.findOne({
                where: { movieId: id },
                attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"]]
            });
            logger.debug({ ratings });
            return ratings?.get("averageRating") ? parseFloat(ratings.get("averageRating") as string).toFixed(2) : "0";
        } catch (error) {
            logger.error(error);
            throw new Error("Error while fetching records");
        }
    }
}