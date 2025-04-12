import { Review } from '../types/review.type';
import { FavouriteContent } from '../types/favouriteContent.type';

export const movieReviews: Review[] = [];
export const tvReviews: Review[] = [];

export const favouriteMovies: FavouriteContent[] = [];
export const favouriteTvShows: FavouriteContent[] = [];
export let nextReviewId = 1;

export const getNextReviewId = () => nextReviewId++;