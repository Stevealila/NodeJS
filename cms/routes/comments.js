import express from "express"
const router = express.Router()
import { auth } from '../middleware/auth.js'

import { allComments, getComment, postComment } from '../controllers/comments.js'

router.route('/all')
    .get(auth, allComments)

router.route('/create')
    .get(auth, getComment)
    .post(auth, postComment)

export default router