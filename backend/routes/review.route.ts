import { Router } from 'express'
import { createUserReview, getAllReviews,getOneReviews, updateUserReview, deleteUserReview } from '../controllers/review.controller'

const router = Router()

router.post('/create', createUserReview)
router.get('/all', getAllReviews)
router.get('/:id', getOneReviews)
router.patch('/update/:id', updateUserReview)
router.delete('/delete/:id', deleteUserReview)

export default router