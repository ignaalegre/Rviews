import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import MoviePage from './pages/MoviePage'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'

import type { Book } from './types'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'

function App() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch('http://localhost:4001/books')
      const data = await response.json()
      setBooks(data)
    }
    getBooks()
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:id" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
