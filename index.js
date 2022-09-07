const app = require("./app.js"); 

const PORT = app.get("PORT"); 

app.listen(PORT, ()=> {
    console.log(`Listening in port ${PORT}`)
})