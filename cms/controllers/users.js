
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

export default {

    getRegister: (req, res) => res.render('users/register'),
    
    postRegister: async (req, res) => {
        const { username, email, pwd, pwd_conf } = req.body

        // VALIDATIONS

        let errors = []
        
        // 1. email exists?
        const userTaken = await User.findOne({ email })
        // 2. passwords don't match?
        const passwordsDontMatch = pwd !== pwd_conf
        
        if(userTaken) errors.push("Email taken")
        if(passwordsDontMatch) errors.push("Passwords don't match")
        
        if (errors.length > 0) { res.redirect('/users/register') }

        // SAVING

        else {
            const password = await bcrypt.hash(pwd, 10)
            let user = new User({ username, email, password })

            try {
                user = await user.save()
                res.redirect('/users/login')
                
            } catch {
                res.render('index/index')
            }
            
        }
},

getLogin: (req, res) => res.render('users/login'),

logoutUser: (req, res) => {
    req.logOut()
    res.redirect('/')
}

}