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

router.post('/addMovie', addFavouriteMovie);
router.delete('/deleteMovie/:id', deleteFavouriteMovie);
router.get('/movies', getAllFavouritesMovies);

router.post('/addTvShow', addFavouriteTvShow);
router.delete('/deleteTvShow/:id', deleteFavouriteTvShow);
router.get('/tv', getAllFavouritesTvShows);

export default router;