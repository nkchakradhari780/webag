const userModel = require("../models/user_model")
const bcrypt = require("bcrypt")        //using for encrypting the password before storing
const jwt = require("jsonwebtoken")          //using to store user details on to cookies
const { generateToken } = require("../utils/generatetoken");


module.exports.registerUser = async (req,res)=>{
    try{
        let {email,fullname,password} = req.body;

        let user = await userModel.findOne({email: email});
        if(user) return res.status(401).send("User alredy exists")
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                if(err) return res.send(err.message);
                else{
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });
                    let token = generateToken(user);
                    res.cookie("token",token);                  
                    res.send("user created successfully");
                }
            })
        })
       
    }
    catch (err) {
        console.log(err.message);
    }

}


module.exports.loginUser = async (req,res)=>{
    let { email, password } = req.body;

    let user = await userModel.findOne({ email:email });
    console.log(user);
    if(!user) return res.send("Email or password is incorrect")
    

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.redirect("/shop")
        }
        else{
            req.flash("error","Email or Password is incorrect");
            return res.redirect("/");
        }
    })
}

module.exports.logout = (req,res)=>{
    res.cookie("token","");
    res.redirect("/");
};