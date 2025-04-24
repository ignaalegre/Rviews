import { Router} from 'express'
import {
    addFavouriteMovie,
    deleteFavouriteMovie,
    getAllFavouritesMovies,
    addFavouriteTvShow,
    deleteFavouriteTvShow,
    getAllFavouritesTvShows
} from '../controllers/favourite.controller'

const router = Router();

router.post('/add/movie', addFavouriteMovie);
router.delete('/delete/movie/:id', deleteFavouriteMovie);
router.get('/movies', getAllFavouritesMovies);

router.post('/add/tv', addFavouriteTvShow);
router.delete('/delete/tv/:id', deleteFavouriteTvShow);
router.get('/tvs', getAllFavouritesTvShows);

export default router;