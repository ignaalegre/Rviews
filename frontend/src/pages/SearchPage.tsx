import { useEffect, useState } from 'react'
import SearchBox from '../components/SearchBox'
import { useParams } from 'react-router-dom'
import { useContentType } from '../context/ContentTypeContext.tsx'
import axios from 'axios'
import ResultItem from '../components/ResultItem.tsx'
import Pagination from '../components/Pagination.tsx'

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { selected } = useContentType()
  const { query } = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [results, setResults] = useState([])
  const [totalPages, setTotalPages] = useState<number>(0)

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/search/${selected}/${query}/${currentPage}`)
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
  }, [query, currentPage, selected])

  useEffect(() => {
    setCurrentPage(1)
  }, [query])

  return (
    <div className="bg-blue-500 p-4 text-white">
      <SearchBox></SearchBox>
      {loading ? (
        <p className="mt-4">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {results.map((result, index) => (
            <ResultItem key={index} result={result} />
          ))}
        </div>
      )}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}></Pagination>
    </div>
  )
}

export default SearchPage
