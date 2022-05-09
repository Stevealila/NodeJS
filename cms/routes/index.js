
import express from "express"

import { auth } from '../middleware/auth.js'
import indexController from '../controllers/index.js'

const router = express.Router()

router.route('/')
    .get(indexController.index)

router.route('/dashboard')
    .get(auth, indexController.dashboard)

router.route('/dashboard/posts')
    .get(auth, indexController.dashboardPosts)
    
router.route('/dashboard/categories')
    .get(auth, indexController.dashboardCategories)

router.route('/dashboard/comments')
    .get(auth, indexController.dashboardComments)

export default router

    