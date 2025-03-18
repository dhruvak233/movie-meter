import { DataTypes } from "sequelize";

export const ratingSchema = {
    ratingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Assuming ratingId is auto-incrementing
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.REAL,
        allowNull: false,
        validate: {
            min: 0.0, // Assuming rating range is 0-10 or 0-5
            max: 10.0 // Adjust based on your rating scale
        }
    },
    timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false, // Assuming it's a UNIX timestamp
    }
};
