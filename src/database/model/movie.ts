import { Model } from "sequelize";
import { movieSchema } from "../schema";
import { moviesDB } from "../connectionManager";

class Movie extends Model {}

Movie.init(
    { ...movieSchema },
    {
        sequelize: moviesDB,
        modelName: "Movie",
        tableName: "movies",
        timestamps: false,
    }
);

export { Movie };
