export interface Review {
    //Lleva la estructura de las reviews de TMDB
    

    id?: number;

    show_type?: string; // Puede ser "movie" o "tv"
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