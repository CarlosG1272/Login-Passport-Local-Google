const bcrypt = require("bcrypt"); 

const users = []; 

const Register = async (req, res) => {
    try {
        const {name, email, password} = req.body; 
        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = {
            id: new Date().toString(),
            name,
            email, 
            password: hashedPassword
        }
        users.push(newUser); 
        console.log(users)
        res.redirect("/login")
    } catch {
        res.redirect("/register")
    }
}


const getUserByEmail = email => users.find(u=> u.email === email)
const getUserbyId = id => users.find(u=> u.id === id)
const addUser = profile => {
    const user = {
        id: profile.id, 
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.email,
        picture: profile.picture
    }
    console.log(user)
    users.push(user)
}   

module.exports = { Register, getUserByEmail, getUserbyId, addUser }