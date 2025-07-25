import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ResultItem from '../components/ResultItem'
import Pagination from '../components/Pagination'

const SearchPage = ({ contentType }: { contentType: 'movie' | 'tv' }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { query } = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [results, setResults] = useState([])
  const [totalPages, setTotalPages] = useState<number>(0)

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/search/${contentType}/${query}/${currentPage}`)
      const answer = res.data.content
      const data = answer.results
      setTotalPages(answer.total_pages)
      setResults(data)
    } catch (error) {
      console.error('Error al traer los datos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [query, currentPage, contentType])

  useEffect(() => {
    setCurrentPage(1)
  }, [query, contentType])

  return (
    <div className="w-screen bg-gray-700 p-4 text-white">
      {loading ? (
        <p className="mt-4">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {results?.map((item, index) => (
            <ResultItem key={index} result={item} contentType={contentType} />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      ></Pagination>
    </div>
  )
}

export default SearchPage
