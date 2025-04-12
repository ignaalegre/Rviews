import { Review } from "../../shared/types";
import { FavouriteContent } from "../../shared/types";

export const movieReviews: Review[] = [];
export const tvReviews: Review[] = [];

export const favouriteMovies: FavouriteContent[] = [];
export const favouriteTvShows: FavouriteContent[] = [];
export let nextReviewId = 1;

export const getNextReviewId = () => nextReviewId++;