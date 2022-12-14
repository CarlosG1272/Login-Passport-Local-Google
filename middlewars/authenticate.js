const isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        return res.redirect("/")
    }
    next()
}

const isNotAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = {isAuthenticated, isNotAuthenticated}