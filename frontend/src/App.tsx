
import Footer from './components/Footer'
import MoviePage from './pages/MoviePage'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import NotFound from './pages/NotFound'
import TvPage from './pages/TvPage'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/movie/:query" element={<SearchPage />} />
        <Route path="/search/tv/:query" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/tv/:id" element={<TvPage />} />
        <Route path="*" element={<NotFound />} /> {/* página de error */}
      </Routes>
      <Footer />
    </>
  )
}

export default App
