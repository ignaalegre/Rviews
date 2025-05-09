import express from 'express'
import cors from 'cors'
import bookRouter from './routes/book.route'
import movieRouter from './routes/movie.route'
import tvRouter from './routes/tv.route'
import reviewRouter from './routes/review.route'
import favouriteRouter from './routes/favourite.route'
import searchRouter from './routes/search.route'


const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use('/api/movie', movieRouter)
app.use('/api/tv', tvRouter)
app.use('/api/review', reviewRouter)
app.use('/api/favourite', favouriteRouter)
app.use('/api/search', searchRouter)

export default app
