const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require('express-session');
const flash = require("connect-flash");

require("dotenv").config();     // using dotenv to use all variables inside .env file

const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const indexRoute = require('./routes/index');
const isLoggedin = require('./middlewares/isLoggedin')


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(
    expressSession({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");


app.use("/owners",isLoggedin, ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", indexRoute);


app.listen(3002);