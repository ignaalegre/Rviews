export type Book = {
  id: string
  title: string
}

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