import { Router } from 'express'
import { searchMovie, searchTv } from "../controllers/search.controller"

const router = Router()

router.get('/movie/:title', searchMovie)
router.get('/tv/:title', searchTv)

export default router