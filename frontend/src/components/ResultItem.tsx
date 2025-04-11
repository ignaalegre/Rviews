import { useContentStore } from '../store/contentStore'
import { Link } from 'react-router-dom'

const ResultItem = ({ result }: any) => {
  const { contentType } = useContentStore()
  const title = contentType === 'movie' ? result?.title : result?.name
  const imageUrl = result?.poster_path
    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'
  const detailUrl = `/${contentType}/${result?.id}`

  return (
    <Link
      to={detailUrl}
      className="bg-white text-black rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 w-72 cursor-pointer"
    >
      <img src={imageUrl} alt={title} className="w-full h-96 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>
        <p className="text-sm mt-2 text-gray-600 line-clamp-3">
          {result?.overview || 'No overview available.'}
        </p>
      </div>
    </Link>
  )
}

export default ResultItem
