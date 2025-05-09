import axios from 'axios'
import { useEffect, useState } from 'react'
import { FavouriteContent } from '../../../shared/types'

const useGetFavourites = () => {
  const [favourites, setFavourites] = useState<FavouriteContent[]>([])

  const fetchFavourites = async () => {
    const res = await axios.get('/api/favourite/movies')
    setFavourites(res.data.favouriteMovies)
  }

  useEffect(() => {
    fetchFavourites()
  }, [])

  return { favourites, refetch: fetchFavourites }
}

export default useGetFavourites
