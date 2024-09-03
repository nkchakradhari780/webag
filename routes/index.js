const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product_model");
const userModel = require("../models/user_model")


router.get("/",(req,res)=>{
    let error = req.flash("error");
    res.render("index",{error, loggedin: false});
});

router.get("/shop", isLoggedin,async (req,res)=>{
    let products = await productModel.find()
    let success = req.flash("success");
    res.render("shop",{products, success});
});

router.get("/cart", isLoggedin,async (req,res)=>{
   let user = await userModel
   .findOne({email: req.user.email}) 
   .populate("cart"); 

   res.render("cart")
});

router.get("/addtocart/:id", isLoggedin,async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email})
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to Cart");
    res.redirect('/shop');
});

router.get('/logout', isLoggedin, (req,res)=>{
    res.render("shop");
})

module.exports = router;