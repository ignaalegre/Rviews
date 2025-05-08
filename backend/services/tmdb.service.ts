import axios from "axios";
import { ENV_VARS } from "../config/envVars";

export const fetchFromTMDB = async (url : string) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
    },
    timeout: 50000,
  };

  console.log("Fetching data from TMDB: ", url);
  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data from TMDB" + response.statusText);
  }

  return response.data;
};
