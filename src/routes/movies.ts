import { Router } from "express";
import { getAllMovies, getMovieById } from "../controllers";

const router = Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);

export default router;