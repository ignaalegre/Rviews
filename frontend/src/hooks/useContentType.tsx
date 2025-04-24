import { useMatch } from "react-router-dom";

export const useContentType = () => {
    const matchRoot = useMatch("/");
    const matchMovie = useMatch("/movie");
    const matchMovieId = useMatch("/movie/:id");
    const matchSearchMovie = useMatch("/search/movie/:query");
  
    const matchTV = useMatch("/tv");
    const matchTVId = useMatch("/tv/:id");
    const matchSearchTV = useMatch("/search/tv/:query");
  
    if (matchTV || matchTVId || matchSearchTV) return "tv";
    if (matchMovie || matchMovieId || matchSearchMovie || matchRoot) return "movie";
  
    return "movie"; // default
};