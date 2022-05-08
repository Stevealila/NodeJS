export const globalVariables = (req, res, next) => {

    res.locals.sucess_alert = req.flash('sucess_alert')
    res.locals.failure_alert = req.flash('failure_alert')
    res.locals.user = req.user || null

    next()

}