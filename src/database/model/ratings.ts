import { Model } from "sequelize";
import {ratingSchema} from "../schema"
import {ratingsDB} from "../connectionManager";

class Ratings extends Model{}

Ratings.init({...ratingSchema},{
    sequelize: ratingsDB,
    modelName: "Ratings",
    tableName: "ratings",
    timestamps: false,
});

export { Ratings };