import { Router } from 'express'
import { searchMovie, searchTv } from "../controllers/search.controller"

const router = Router()

router.get('/movie/:title/:page?', searchMovie)
router.get('/tv/:title/:page?', searchTv)

export default router