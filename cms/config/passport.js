import passport_local from "passport-local"
import bcrypt from "bcryptjs"
import User from '../models/User.js'

const LocalStrategy = passport_local.Strategy

const authenticateUser = (passport) => {

    passport.use(new LocalStrategy( {usernameField: 'email', passwordField: 'password'}, (email, password, done) => {

        User.findOne({ email })
        .then (user => {
            if(!user){ return done(null, false) } 
            else {
                const isValid = bcrypt.compareSync(password, user.password)
                if(!isValid){
                    return done(null, false)
                }else{
                    return done(null, user)
                }
            }
        })
    }))

    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser( (id, done) => User.findById(id)
    .then( user => done(null, user))
    .catch( err => done(err))
    )

}
    
export default authenticateUser