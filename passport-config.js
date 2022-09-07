const LocalStrategy = require("passport-local").Strategy; 
const bcrypt = require("bcrypt"); 

const initialize  = (passport, getUserByEmail, getUserbyId) => {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email); 
        if(!user){
            return done(null, false, {message: "No user with that email"}); 
        }

        try{
            const isCorrect = await bcrypt.compare( password, user.password)
            return isCorrect ? done(null, user):done(null, false, {message: "Password incorrect"})
        }catch(e){
            return(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: "email"}, authenticateUser))
    passport.serializeUser((user, done)=> done(null, user.id))
    passport.deserializeUser((id, done)=> done(null, getUserbyId(id)))

}

module.exports = initialize; 