


export interface Content {
  id: number
  title?: string
  name?: string
  overview: string
  backdrop_path: string
}

export interface FavouriteContent {
  id: number;
  title: string;
  contentType: string; // Puede ser "movie" o "tv"
}

export interface Review {
  //Lleva la estructura de las reviews de TMDB
  

  id_?: number;
  title? : string; // Puede ser el titulo de una pelicula o de una serie, lo recuperamos del front para no hacer una peticion a TMDB y solo cuando lo hace el usuario
  contentType: string; // Puede ser "movie" o "tv"
  show_id?: string; // Puede ser el id de una pelicula o de una serie

  author?: string;
  author_details: {
    name: string;
    username: string;
    avatar_path?: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url?: string; // El usuario principal no tendra este campo, solo las reviews recuperadas de TMDB

}

export interface Search {
  id: number;
  title: string;
  contentType: string; // Puede ser "movie" o "tv"
}

export type MovieDetailsResponse = {
  success: boolean;
  content: {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: any; // o podés definir una estructura si sabés los campos
    budget: number;
    genres: {
      id: number;
      name: string;
    }[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
};

export type TvDetailsResponse = {
  success: boolean;
  content: {
    adult: boolean;
    backdrop_path: string;
    created_by: {
      id: number;
      credit_id: string;
      name: string;
      original_name: string;
      gender: number;
      profile_path: string | null;
    }[];
    episode_run_time: number[];
    first_air_date: string;
    genres: {
      id: number;
      name: string;
    }[]; // en tu ejemplo viene vacío, pero TMDB devuelve este tipo
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
      id: number;
      name: string;
      overview: string;
      vote_average: number;
      vote_count: number;
      air_date: string;
      episode_number: number;
      episode_type: string;
      production_code: string;
      runtime: number;
      season_number: number;
      show_id: number;
      still_path: string | null;
    };
    name: string;
    next_episode_to_air: any; // null en este caso, pero podría ser un objeto igual al anterior
    networks: any[]; // si necesitás detalle podés tiparlos
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: any[]; // también podés definir estructura si los usás
    production_countries: any[];
    seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string | null;
      season_number: number;
      vote_average: number;
    }[];
    spoken_languages: any[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
  };
};

export interface Trailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string; // ID de YouTube
  name: string;
  official: boolean;
  published_at: string;
  site: string; // Ej: "YouTube"
  size: number; // Ej: 1080
  type: string; // Ej: "Trailer", "Teaser", etc.
}