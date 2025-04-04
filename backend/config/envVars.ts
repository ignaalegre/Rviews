import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 4001,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};
