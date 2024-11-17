const mongoose = require('mongoose');
const config = require("config");

const dbgr = require("debug")("development:mongoose");

mongoose
.connect(`${config.get("MONGODB_URI")}/bagwebpage`)
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    dbgr(err);
})

module.exports = mongoose.connection;