const express = require("express"); 
const {Register} = require("../controllers/Register");
const router = express.Router(); 
const {isAuthenticated} = require("../middlewars/authenticate")
router.get("/", isAuthenticated,(req,res)=> {
    res.render("register.ejs")
})
router.post("/", isAuthenticated, Register)

module.exports = router; 