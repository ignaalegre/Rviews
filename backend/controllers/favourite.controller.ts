import { FavouriteContent } from "../../shared/types";
import { Request, Response } from "express";
import { favouriteMovies, favouriteTvShows } from "../data/memory";


export const addFavouriteMovie = (req: Request, res: Response): void => {
    const { id, title, contentType } = req.body;

    const newFavouriteMovie: FavouriteContent = {
        id: Number(id),
        title,
        contentType
    }
    const existingMovie = favouriteMovies.find((movie) => movie.id === id);
    if (existingMovie) {
        res.status(400).json({ message: "La película ya está en favoritos" });
        return;
    }
    favouriteMovies.push(newFavouriteMovie);
    res.status(201).json({ message: "Película agregada a favoritos", favouriteMovies });
}


export const deleteFavouriteMovie = (req: Request, res: Response): void => {
    const { id } = req.params;
    const index = favouriteMovies.findIndex((movie) => movie.id === Number(id));
    if (index === -1) {
        res.status(200).json({ message: "La película no se encuentra en favoritos" });
        return;
    }
    favouriteMovies.splice(index, 1);
    res.status(200).json({ message: "Película eliminada de favoritos", favouriteMovies });
}
export const getAllFavouritesMovies = (req: Request, res: Response): void => {
    if (!favouriteMovies.length) {
        res.status(200).json({ message: "No hay películas en favoritos", favouriteMovies });
        return;
    }
    res.status(200).json({ favouriteMovies });
}
export const addFavouriteTvShow = (req: Request, res: Response): void => {
    const { id, title, contentType } = req.body;

    const newFavouriteTvShow: FavouriteContent = {
        id: Number(id),
        title,
        contentType
    }
    const existingTvShow = favouriteTvShows.find((tvShow) => tvShow.id === id);
    if (existingTvShow) {
        res.status(400).json({ message: "La serie ya está en favoritos" });
        return;
    }
    favouriteTvShows.push(newFavouriteTvShow);
    res.status(201).json({ message: "Serie agregada a favoritos", favouriteTvShows });
}
export const deleteFavouriteTvShow = (req: Request, res: Response): void => {
    const { id } = req.params;
    const index = favouriteTvShows.findIndex((tvShow) => tvShow.id === Number(id));

    if (index === -1) {
        res.status(200).json({ message: "La serie no se encuentra en favoritos" });
        return;
    }
    favouriteTvShows.splice(index, 1);
    res.status(200).json({ message: "Serie eliminada de favoritos", favouriteTvShows });
}
export const getAllFavouritesTvShows = (req: Request, res: Response): void => {
    if (!favouriteTvShows.length) {
        res.status(200).json({ message: "No hay series en favoritos", favouriteTvShows });
        return;
    }
    res.status(200).json({ favouriteTvShows });
}
