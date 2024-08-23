const mongoose = require('mongoose');


const ownerrSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    products: [] ,
    contact: Number,
    picture: String,
    gstno: String
});

module.exports = mongoose.model("user", userSchema);