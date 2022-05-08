import express from "express"
import passport  from 'passport'
const router = express.Router()

import userController from '../controllers/users.js'

router.route('/register')
    .get(userController.getRegister)
    .post(userController.postRegister)

router.route('/login')
    .get(userController.getLogin)
    .post(passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/users/register' }))

router.route('/logout')
    .delete(userController.logoutUser)


export default router