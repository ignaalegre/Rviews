import axios from 'axios'
import { useEffect, useState } from 'react'
import { FavouriteContent } from '../types'

const useGetFavourites = () => {
  const [favourites, setFavourites] = useState<FavouriteContent[]>([])

  const fetchFavourites = async () => {
    const res = await axios.get('http://localhost:4001/favourite/movies')
    setFavourites(res.data.favouriteMovies)
    console.log(res.data.favouriteMovies)
  }

  useEffect(() => {
    fetchFavourites()
  }, [])

  return { favourites, refetch: fetchFavourites }
}

export default useGetFavourites
