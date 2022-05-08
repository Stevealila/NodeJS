
import express from "express"
import { auth } from '../middleware/auth.js'
import categoriesController from '../controllers/categories.js'

const router = express.Router()

router.route('/create')
    .get(auth, categoriesController.renderCreateForm)
    .post(auth, categoriesController.categoryCreate)

router.route('/:id')
    .delete(auth, categoriesController.categoryDelete)

export default router
