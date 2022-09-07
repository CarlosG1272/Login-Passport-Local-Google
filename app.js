const express = require("express"); 
const morgan = require("morgan"); 

const LoginRoute = require("./routes/Login")
const RegisterRoute = require("./routes/Register")
const passport = require("passport"); 
const {getUserByEmail, getUserbyId, addUser} = require("./controllers/Register")
const flash = require("express-flash"); 
const session = require("express-session"); 
const {isNotAuthenticated} = require("./middlewars/authenticate")


// Initialize
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}


const app = express(); 
const initialize = require("./passport-config"); 
initialize(passport, getUserByEmail, getUserbyId)

const initializePassportGoogle = require("./passport-google-config"); 
initializePassportGoogle(passport, getUserByEmail, getUserbyId, addUser)

// Setttings 
app.set("PORT", process.env.PORT || 3001); 
app.set("view-engine", "ejs")

// Middlewares
app.use(express.urlencoded({extended: false})); 
app.use(morgan("dev")); 
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
// Routes
app.get("/", isNotAuthenticated,(req,res)=> {
    const options = {
        name: req.user.name, 
        picture: req.user.picture ? req.user.picture:null
    }
    res.render("index.ejs", options)
})

app.get("/logout", (req,res)=> {
    req.logout((err)=> {
        if(err) {
            return next(err)
        }
        req.session.destroy(); 
        res.redirect("/")
    }); 
})
app.use("/login", LoginRoute)
app.use("/register", RegisterRoute)

module.exports = app; 