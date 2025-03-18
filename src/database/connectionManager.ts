import { Sequelize } from "sequelize";
import {logger} from "../utils";

export const moviesDB = new Sequelize({
    dialect: "sqlite",
    storage: "./src/database/sources/movies.db",
    logging: false // Disable logging for cleaner output
});

moviesDB.sync({ force: false })
    .then(async () => {
        const [results] = await moviesDB.query("PRAGMA table_info(movies);");
        logger.info("✅ Movies database synchronized");
        console.log("📌 Movie Table Columns:");
        results.forEach((col: any) => {
            console.log(`- ${col.name} (${col.type})`);
        });
    })
    .catch((err) => logger.error("❌ Error syncing movies database:", err));

export const ratingsDB = new Sequelize({
    dialect: "sqlite",
    storage: "./src/database/sources/ratings.db",
    logging: false // Disable logging for cleaner output
});

ratingsDB.sync({ force: false })
    .then(async () => {
        const [results] = await ratingsDB.query("PRAGMA table_info(ratings);");
        logger.info("✅ Ratings database synchronized");
        console.log("📌 Rating Table Columns:");
        results.forEach((col: any) => {
            console.log(`- ${col.name} (${col.type})`);
        });
    })
    .catch((err) => logger.error("❌ Error syncing ratings database:", err));
