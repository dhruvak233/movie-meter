// import { moviesDB, ratingsDB } from "../../database/connectionManager";
import { moviesDB, ratingsDB } from "../src/database/connectionManager";

export async function setupTestDB() {
    try {
        // Ensure DBs are connected
        await moviesDB.authenticate();
        await ratingsDB.authenticate();

        // Sync databases
        await moviesDB.sync({ force: false });
        await ratingsDB.sync({ force: false });

        console.log("✅ Databases successfully initialized before tests!");
    } catch (error) {
        console.error("❌ Failed to initialize test databases:", error);
        process.exit(1); // Stop tests if DB setup fails
    }
}
