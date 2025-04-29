import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import { useState } from 'react'
import NavItem from './NavItem'
import { useSidebarStore } from '../store/sidebarStore'
import { useEffect } from 'react'
import { PiNotebookFill } from 'react-icons/pi'
import { useFavouritesStore } from '../store/favouriteStore'
import { useReviewsStore } from '../store/reviewsStore'
const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarStore()
  const [isVisible, setIsVisible] = useState(isOpen)
  const { favouritesMovies, favouriteSeries, fetchFavouritesMovies, fetchFavouritesSeries } =
    useFavouritesStore()
  const { moviesReviews, tvReviews, fetchMovieReviews, fetchTvReviews } = useReviewsStore()

  useEffect(() => {
    fetchFavouritesMovies()
    fetchFavouritesSeries()
    fetchMovieReviews()
    fetchTvReviews()
    console.log(moviesReviews)
    console.log(tvReviews)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <div
      style={{ overflow: 'hidden' }}
      className={`flex flex-col bg-gray-900 'scrollbar-hide' overflow-hidden ${isOpen && 'border-r-4 border-gray-700/85'} `}
    >
      {isVisible && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isOpen ? 240 : 0 }}
          transition={{ duration: 0.4 }}
          className={`bg-gray-900 h-screen text-white p-4 flex  `}
          style={{ outline: 'none' }}
        >
          <nav
            className={`flex flex-col gap-8 h-full overflow-y-auto ${!isOpen && 'scrollbar-hide'}`}
          >
            <NavItem
              icon={<FaStar />}
              text={'Favoritos'}
              isOpen={isOpen}
              setIsOpen={toggleSidebar}
              expandableMovies={favouritesMovies}
              expandableSeries={favouriteSeries}
            />
            <NavItem
              icon={<PiNotebookFill />}
              text={'Mis Reseñas'}
              isOpen={isOpen}
              setIsOpen={toggleSidebar}
              expandableMovies={moviesReviews}
              expandableSeries={tvReviews}
            />
          </nav>
        </motion.div>
      )}
    </div>
  )
}

export default Sidebar
