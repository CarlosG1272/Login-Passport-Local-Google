const GoogleStrategy = require("passport-google-oauth2"); 

const initializePassportGoogle = (passport, getUserByEmail, getUserbyId, addUser) => {
    
    // Callback to do if autenthicate is succesfull
    const authenticateUser = (request, accessToken, refreshToken, profile, done) => {
        const user = getUserbyId(profile.id); 
        if(!user){
            addUser(profile)
        }
        return done(null, profile)
    }

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        callbackURL: 'http://localhost:3001/login/googlesuccess'
    }, authenticateUser))

    passport.serializeUser((user, done)=> {
        done(null, user); 
    })
    passport.deserializeUser((user, done)=> {
        done(null, user);
    })
}

module.exports = initializePassportGoogle