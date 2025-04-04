import express from 'express'
import {
    getTrendingMovie,
    getMovieTrailers,
    getMovieDetails,
    getSimilarMovies,
    getMoviesByCategory,
    getMovieReviews,
  } from "../controllers/movie.controller.ts";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:id/reviews", getMovieReviews);
router.get("/:category", getMoviesByCategory);

export default router;