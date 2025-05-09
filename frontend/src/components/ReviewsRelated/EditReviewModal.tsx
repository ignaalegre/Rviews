import { useState, FormEvent, useEffect } from 'react'
import { Review } from '../../../../shared/types'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useReviewsStore } from '../../store/reviewsStore'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  review: Review | null
}

const Modal = ({ isOpen, onClose, review }: ModalProps) => {
  const [author, setAuthor] = useState<string | undefined>(review?.author)
  const [username, setUsername] = useState<string | undefined>(review?.author_details.username)
  const [rating, setRating] = useState<number | null>(review?.author_details.rating ?? null)
  const [content, setContent] = useState<string | undefined>(review?.content)
  const { fetchMovieReviews, fetchTvReviews } = useReviewsStore()

  useEffect(() => {
    if (review) {
      setAuthor(review.author)
      setUsername(review.author_details.username)
      setRating(review.author_details.rating ?? 0)
      setContent(review.content)
    }
  }, [review, isOpen])
  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!author || !username || !content) {
      toast.error('Por favor, completa todos los campos.')
      return
    }
    const data = new URLSearchParams()
    data.append('author', author)
    data.append('author_details.name', author) // mismo valor que author
    data.append('author_details.username', username)
    data.append('author_details.rating', rating?.toString() ?? '0')
    data.append('content', content)

    try {
      await axios.patch(`/api/review/${review?.contentType}/update/${review?.id_}`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      setAuthor('')
      setUsername('')
      setRating(0)
      setContent('')
      if (review?.contentType === 'movie') {
        fetchMovieReviews()
      } else if (review?.contentType === 'tv') {
        fetchTvReviews()
      }
      toast.success('Reseña editada con éxito.')
    } catch (error) {
      console.error('Error al editar la reseña:', error)
      toast.error('Ocurrió un error al editar la reseña.')
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-slate-800 rounded-2xl shadow-lg text-white text-center w-full max-w-md p-6 relative">
        <button
          onClick={() => {
            onClose()
            setAuthor('')
            setUsername('')
            setRating(0)
            setContent('')
          }}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Editar reseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              name="author"
              placeholder="Nombre"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="min-w-[120px] flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Tu usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="min-w-[120px] flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              className="min-w-[60px] w-[60px] border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
              value={rating?.toString() ?? '0'}
              onChange={e => setRating(Number(e.target.value))}
            >
              {Array.from({ length: 11 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <div>
            <textarea
              name="content"
              placeholder="Escribí tu reseña..."
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full h-40 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Modal
