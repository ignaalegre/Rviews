import { useState, useEffect } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { FaHeart } from 'react-icons/fa'
import axios from 'axios'
import { useFavouritesStore } from '../store/favouriteStore'
import Toast from 'react-hot-toast'

type Props = {
  show_id: string
  title: string
  contentType: string
}

const FavButton = ({ show_id, title, contentType }: Props) => {
  const [isFav, setIsFav] = useState(false)
  const [hasJustFaved, setHasJustFaved] = useState(false)
  const { favouritesMovies, fetchFavouritesMovies, favouriteSeries, fetchFavouritesSeries } =
    useFavouritesStore()

  const addFavourite = async () => {
    const data = new URLSearchParams()
    data.append('id', show_id)
    data.append('title', title)
    data.append('content_type', contentType)
    try {
      await axios.post(`/api/favourite/add/${contentType}`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      fetchFavouritesMovies()
      fetchFavouritesSeries()

      Toast.success(`${contentType == 'movie' ? 'Pelicula' : 'Serie'} Agregada a favoritos.`)
    } catch (error) {
      Toast.error('Ocurrio un error.')
    }
  }

  const deleteFavourite = async () => {
    try {
      await axios.delete(`/api/favourite/delete/${contentType}/${show_id}`)
      Toast.success(`${contentType == 'movie' ? 'Pelicula' : 'Serie'} eliminada de favoritos.`)
      fetchFavouritesMovies()
      fetchFavouritesSeries()
    } catch (error) {
      console.error('Error al eliminar de Favoritos:', error)
      Toast.error('Ocurrió un error.')
    }
  }

  const handleClick = async () => {
    if (isFav) {
      await deleteFavourite()
      setIsFav(false)
    } else {
      await addFavourite()
      setIsFav(true)
    }
  }

  const checkIfFav = () => {
    const isFavourite =
      contentType == 'movie'
        ? favouritesMovies?.some(movie => movie.id.toString() === show_id)
        : favouriteSeries?.some(tv => tv.id.toString() === show_id)
    setIsFav(isFavourite)
  }

  useEffect(() => {
    checkIfFav()
  }, [])

  //Animacion de color rojo a blanco
  useEffect(() => {
    if (isFav) {
      setHasJustFaved(true)
      const timeout = setTimeout(() => {
        setHasJustFaved(false)
      }, 500) // Duración de la animación roja antes de volverse blanca
      return () => clearTimeout(timeout)
    }
  }, [isFav])

  return (
    <button
      className="bg-gray-400/30 rounded-full hover:bg-green-500   p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
      onClick={() => handleClick()}
    >
      {isFav ? (
        <FaHeart
          className={`size-6 hover:scale-105 transition-colors duration-500 ${
            hasJustFaved ? 'text-red-600' : 'text-white'
          }`}
        />
      ) : (
        <FaRegHeart className="size-6 hover:scale-105 text-white transition-colors duration-500" />
      )}
    </button>
  )
}

export default FavButton
