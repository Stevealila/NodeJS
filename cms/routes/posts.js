
import express from "express"
import { auth } from '../middleware/auth.js'
import postsController from '../controllers/posts.js'

const router = express.Router()

router.route('/create')
    .get(auth, postsController.renderCreateForm)
    .post(auth, postsController.postCreate)

router.route('/one/:id')
    .get(postsController.readOnePost)

router.route('/:id')
    .get(auth, postsController.renderEditForm)
    .put(auth, postsController.postEdit)
    .delete(auth, postsController.postDelete)

export default router
