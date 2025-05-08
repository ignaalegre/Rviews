import { Request, Response } from "express";
import { fetchFromTMDB } from "../services/tmdb.service";
import axios from "axios";

export const searchMovie = async (req: Request, res: Response): Promise<void> => {
    const { title } = req.params;
    const page = req.params.page ? parseInt(req.params.page, 10) : 1;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${title}&page=${page}`
        );
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            res.status(404).send(null);
            return;
        } else
            res
                .status(500)
                .json({ success: false, message: "Internal server error" + error });
    }
}

export const searchTv = async (req: Request, res: Response): Promise<void> => {
    const { title } = req.params;
    const page = req.params.page ? parseInt(req.params.page, 10) : 1;

    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${title}&page=${page}`
        );
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            res.status(404).send(null);
            return;
        } else
            res
                .status(500)
                .json({ success: false, message: "Internal server error" + error });
    }
}