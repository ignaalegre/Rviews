
import Footer from './components/Footer'
import MoviePage from './pages/MoviePage'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import { ContentTypeProvider } from './context/ContentTypeContext.tsx'

function App() {
  return (
    <ContentTypeProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/movie/:query" element={<SearchPage />} />
        <Route path="/search/tv/:query" element={<SearchPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />

      </Routes>
      <Footer />
    </ContentTypeProvider>
  )
}

export default App
