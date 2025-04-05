import { Request, Response } from "express";
import { fetchFromTMDB } from "../services/tmdb.service.ts";
import axios from "axios";

export async function getTrendingTv(req: Request, res: Response): Promise<void> {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=es-ES"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res
      .status(500)
      .json({ sucess: false, message: "Internal  server Error" + error });
  }
}

export async function getTvTrailers(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({ success: true, trailers: data.results });
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

export async function getTvDetails(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=es-ES`
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

export async function getSimilarTvs(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=es-ES&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvsByCategory(req: Request, res: Response): Promise<void> {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=es-ES&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvReviews(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US`
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
