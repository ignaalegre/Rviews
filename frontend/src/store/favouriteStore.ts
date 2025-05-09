
import { create } from 'zustand'
import axios from 'axios'
import { FavouriteContent } from '../../../shared/types'


interface FavouritesState {
    favouritesMovies: FavouriteContent[]
    favouriteSeries: FavouriteContent[]
    fetchFavouritesMovies: () => Promise<void>
    fetchFavouritesSeries: () => Promise<void>

}

export const useFavouritesStore = create<FavouritesState>((set) => ({
  favouritesMovies: [],
  favouriteSeries: [],
  fetchFavouritesMovies: async () => {
    const res = await axios.get('/api/favourite/movies')
    set({ favouritesMovies: res.data.favouriteMovies })
  },
    fetchFavouritesSeries: async () => {
        const res = await axios.get('/api/favourite/tvs')
        set({ favouriteSeries: res.data.favouriteTvShows })
    },
}))