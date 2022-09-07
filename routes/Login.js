const express = require("express"); 
const router = express.Router(); 
const passport = require("passport"); 
const {isAuthenticated} = require("../middlewars/authenticate")

router.get("/", isAuthenticated,(req,res)=> {
    res.render("login.ejs")
})

router.post("/", isAuthenticated, passport.authenticate("local", {
    successRedirect: "/", 
    failureRedirect: "/login", 
    failureFlash: true
}))


router.get("/google", passport.authenticate("google", {
    scope: ["email", "profile"]
}))

router.get("/googlesuccess", passport.authenticate("google", {
    successRedirect: "/", 
    failureRedirect: "/login"
}))


module.exports = router; 
