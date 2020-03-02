'use strict'
const express = require("express");
const app = express();

let authcontroller = require("../services/authController.js");
let usercontroller = require("../services/usercontroller.js");

app.use('/auth',authcontroller);
app.use('/users',usercontroller);

module.exports = app;