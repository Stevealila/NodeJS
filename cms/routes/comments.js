
import express from "express"
import { auth } from '../middleware/auth.js'
import commentsController from '../controllers/comments.js'

const router = express.Router()

router.route('/create/:id')
    .post(auth, commentsController.commentCreate)

export default router
