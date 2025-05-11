import Footer from './components/Footer'
import MoviePage from './pages/MoviePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import NotFound from './pages/NotFound'
import TvPage from './pages/TvPage'
import Sidebar from './components/Sidebar'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <>
      <Toaster />
      <Header />
      <div className="flex max-w-screen overflow-x-hidden">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/movie" replace />} />{/*La home page es de películas por default */}
          <Route path="/movie" element={<HomePage contentType="movie" />} />
          <Route path="/tv" element={<HomePage contentType="tv" />} />
          <Route path="/search/movie/:query" element={<SearchPage contentType="movie" />} />
          <Route path="/search/tv/:query" element={<SearchPage contentType="tv" />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/tv/:id" element={<TvPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App
