import { Request, Response } from "express";
import { fetchFromTMDB } from "../services/tmdb.service";
import axios from "axios";


export async function getTrendingMovie(req: Request, res: Response): Promise<void> {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=es-ES"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server Error" + error });
  }
}

export async function getMovieTrailers(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      res.status(404).send(null);
      return;
    }
    res.status(500).json({ success: false, message: "Internal server error" + error });
  }
}

export async function getMovieDetails(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=es-ES`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      res.status(404).send(null);
      return;
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarMovies(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=es-ES&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      res.status(404).send(null);
      return;
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMoviesByCategory(req: Request, res: Response): Promise<void> {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=es-ES&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      res.status(404).send(null);
      return;
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

  export async function getMovieReviews(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const data = await fetchFromTMDB(
        `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`
      );
      res.status(200).json({ success: true, content: data });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        res.status(404).send(null);
        return;
      }
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

