const express = require("express");
const router = express.Router();
const isloggedin = require('../middlewares/isLoggedin');
const { 
    registerUser, 
    loginUser, 
    logout
} = require("../controllers/authController");



router.get("/", (req,res)=>{
    res.send("hey its working ");
});


// not using joy based relation or function to handling the error when any field is not being passed by the user
router.post("/register",registerUser);

router.post("/login", loginUser);

router.post("/logout",logout);

module.exports = router;