import { FaEdit, FaTrash } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useReviewsStore } from '../../store/reviewsStore'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Review } from '../../../../shared/types'
import Modal from './EditReviewModal'

type Props = {
  show_id: string | undefined
  contentType: string | undefined
}

const UserReviews = ({ show_id, contentType }: Props) => {
  const { moviesReviews, tvReviews, fetchMovieReviews, fetchTvReviews } = useReviewsStore()

  const [allUserReviews, setAllUserReviews] = useState<Review[]>([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)

  useEffect(() => {
    if (!show_id) return
    if (contentType === 'movie') {
      setAllUserReviews(moviesReviews?.filter(r => r.show_id === show_id))
    } else if (contentType === 'tv') {
      setAllUserReviews(tvReviews?.filter(r => r.show_id === show_id))
    }
  }, [show_id, moviesReviews, tvReviews])

  useEffect(() => {
    if (contentType === 'movie') {
      fetchMovieReviews()
    } else if (contentType === 'tv') {
      fetchTvReviews()
    }
  }, [])

  const handleDelete = async (reviewId: number | undefined) => {
    try {
      console.log('fetching' + `/api/review/${contentType}/delete/${reviewId}`)
      const res = await axios.delete(`/api/review/${contentType}/delete/${reviewId}`)
      if (res.status === 200) {
        if (contentType === 'movie') {
          await fetchMovieReviews()
        } else if (contentType === 'tv') {
          await fetchTvReviews()
        }
        toast.success('Reseña eliminada con éxito.')
      }
    } catch (error) {
      console.error('Error al eliminar la reseña:', error)
      toast.error('Ocurrió un error al eliminar la reseña.')
    }
  }

  if (!allUserReviews || allUserReviews?.length === 0) {
    return (
      <div className="bg-green-500/20 backdrop-blur-md p-6 rounded-lg shadow-lg text-white">
        <p className="text-sm">Aún no haz hecho ninguna Reseña aquí. Comparte tu Opinion!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 mb-16">
      {allUserReviews?.map((review, index) => (
        <div
          key={index}
          className="bg-green-500/20 backdrop-blur-md p-6 rounded-lg shadow-lg text-white transition duration-300 hover:scale-[1.01]"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold">
                {review.author_details?.name || 'Autor desconocido'}
              </h2>
              <h3 className="text-l font-light">
                @{review?.author_details?.username || 'Sin nombre de usuario'}
              </h3>
              <h4 className="text-sm font-extralight">
                {review?.created_at
                  ? new Date(review.created_at).toLocaleDateString()
                  : 'Fecha no disponible'}
              </h4>
            </div>

            <div className="flex flex-col items-stretch  ">
              {/* Círculo naranja */}
              <span className="text-2xl font-bold bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                {review?.author_details?.rating == null ? '-' : review?.author_details?.rating}
              </span>

              {/* Botones debajo del círculo */}
              <div className="flex space-x-2 justify-between mt-10">
                <button
                  className=" hover:text-green-400 hover:scale-105"
                  onClick={() => {
                    setModalOpen(true)
                    setSelectedReview(review)
                  }}
                >
                  <FaEdit className="size-5" />
                </button>
                <button
                  onClick={() => handleDelete(review.id_)}
                  className=" hover:text-red-500 hover:scale-105"
                >
                  <FaTrash className="size-4" />
                </button>
              </div>
            </div>
          </div>
          <p className="text-sm">
            {review?.content?.length > 1200
              ? review?.content.slice(0, 1200) + '...'
              : review?.content}
          </p>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} review={selectedReview} />
    </div>
  )
}

export default UserReviews
