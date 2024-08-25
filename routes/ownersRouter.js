const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner_model")

router.get("/", (req,res)=>{
    res.send("hey its working ");
});

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === "development"){         //if development enviornment is there then only the user will be created
    router.post("/create", async(req,res)=>{
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res
                .status(503)
                .send("you don't have prmission to create a new owner.");
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

  res.render('createproducts') 
})

module.exports = router;