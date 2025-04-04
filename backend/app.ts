import express from 'express'
import cors from 'cors'
import bookRouter from './routes/book.route'
import movieRouter from './routes/movie.route'
import tvRouter from './routes/tv.route'
import reviewRouter from './routes/review.route'
import favouriteRouter from './routes/favourite.route'


const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use('/books', bookRouter)
app.use('/movie', movieRouter)
app.use('/tv', tvRouter)
app.use('/review', reviewRouter)
app.use('/favourite', favouriteRouter)


export default app
