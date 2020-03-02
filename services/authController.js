'use strict'
const express = require("express");
const router = express.Router();
const userBL = require('../BL/user.bl');
const jwt = require('jsonwebtoken');
const encryptorUtils = require('../utils/encrypterutils.js');

router.post('/login',(req,res)=>{
    userBL.getUserByEmail(req,res)
    .then((user)=>{
        const decryptedPassword =  encryptorUtils.decrypt(user.password)
        if(user){
            if(decryptedPassword ===req.body.password){
                const token = user.generateAuthToken(user);
                res.header("x-access-token", token);
                return res.status(200).send({auth:true,token:token});
            }
            else
            return res.status(401).send({auth:false,token:null,message:'Invalid password'});
        }
        else
            return res.status(404).send({auth:false,token:null,message:'No user found'});
    })
    .catch((err)=>{
        return res.status(401).send({auth:false,token:null,message:'User authenticated'});
    });
});

router.post('/logout',(req,res)=>{
    let token = req.headers['x-access-token'];
    if (!token) 
        return res.status(404).send({ auth: false, message: 'No token found.' });
    jwt.verify(token, config.JWT_SECRET_TOKEN, function(err, decoded) {
        if (err) 
        return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
         
        res.status(200).send({logout:true,token:null});
    });
});

module.exports = router;