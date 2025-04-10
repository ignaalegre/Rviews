import Hero from '../components/Hero'
import MovieSlider from '../components/MovieSlider'
import { useContentStore } from '../store/content'
import { MOVIE_CATEGORIES, TV_CATEGORIES } from '../utils/constants'

const HomePage = () => {
  const { contentType } = useContentStore()
  return (
    <div>
      <Hero />
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === 'movie'
          ? MOVIE_CATEGORIES.map(category => <MovieSlider key={category.id} category={category} />)
          : TV_CATEGORIES.map(category => <MovieSlider key={category.id} category={category} />)}
      </div>
    </div>
  )
}

export default HomePage
