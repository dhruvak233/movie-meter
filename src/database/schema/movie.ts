import { DataTypes } from "sequelize";

export const movieSchema = {
    movieId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    imdbId: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    overview: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    productionCompanies: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    releaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    budget: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    revenue: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    runtime: {
        type: DataTypes.REAL,
        allowNull: true,
    },
    language: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    genres: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}