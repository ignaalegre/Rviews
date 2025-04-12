import { Router } from 'express'
import { createUserReview, getAllReviews,getOneReviews, updateUserReview, deleteUserReview } from '../controllers/review.controller'

const router = Router()

router.post('/:type/create', createUserReview)
router.get('/:type/all', getAllReviews)
router.get('/:type/:id', getOneReviews)
router.patch('/:type/update/:id', updateUserReview)
router.delete('/:type/delete/:id', deleteUserReview)


export default router