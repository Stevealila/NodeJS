export const auth = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    }else {
        res.redirect('/users/login')
    }
}