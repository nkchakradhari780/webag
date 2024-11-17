const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner_model")

router.get("/", (req,res)=>{
    res.render('owner-login')
});

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === "development"){         //if development enviornment is there then only the user will be created
    router.post("/create", async(req,res)=>{
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res
                .status(503)
                .send("Owner Already Exists.");
        }
    
        let {fullname,email,password} = req.body;
    
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
        // res.send("hey it's working");
    });
}

router.get("/admin",(req,res)=>{
  let success = req.flash("success");
  res.render('createproducts', {success}) 
})

module.exports = router;