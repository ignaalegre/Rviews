import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useReviewsStore } from '../../store/reviewsStore'

type Props = {
  show_id: string
  title: string
  contentType: string
}

const CreateReview = ({ show_id, title, contentType }: Props) => {
  const [author, setAuthor] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [content, setContent] = useState<string>('')
  const { fetchMovieReviews, fetchTvReviews } = useReviewsStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author || !username || !content) {
      toast.error('Por favor, completa todos los campos.')
      return
    }

    const data = new URLSearchParams()
    data.append('show_id', show_id)
    data.append('title', title)
    data.append('author', author)
    data.append('author_details.name', author) // mismo valor que author
    data.append('author_details.username', username)
    data.append('author_details.rating', rating.toString())
    data.append('content', content)

    try {
      const res = await axios.post(`/api/review/${contentType}/create`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      setAuthor('')
      setUsername('')
      setRating(0)
      setContent('')
      if (contentType === 'movie') {
        fetchMovieReviews()
      } else if (contentType === 'tv') {
        fetchTvReviews()
      }
      toast.success('Reseña publicada con éxito.')
    } catch (error) {
      console.error('Error al enviar la reseña:', error)
      toast.error('Ocurrió un error al publicar la reseña.')
    }
  }

  return (
    <form className="mb-10" onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-1">Autor</label>
          <input
            type="text"
            className="w-full p-2 rounded-md text-black"
            placeholder="Tu nombre"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="w-full p-2 rounded-md text-black"
            placeholder="Tu nombre de usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="w-32">
          <label className="block mb-1">Rating</label>
          <select
            className="w-full p-2 rounded-md text-black"
            value={rating} // Asigna el valor actual de rating
            onChange={e => setRating(Number(e.target.value))} // Actualiza el estado de rating al seleccionar un nuevo valor
          >
            {Array.from({ length: 11 }, (_, i) => (
              <option key={i} value={i}>
                {' '}
                {/* Aquí el value debería ser 'i', no 'rating' */}
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Reseña</label>
        <textarea
          className="w-full p-4 text-black rounded-md"
          placeholder="Escribí tu reseña..."
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-400 hover:scale-105 transition-transform px-6 py-2 rounded-md font-semibold"
      >
        Enviar Reseña
      </button>
    </form>
  )
}

export default CreateReview
