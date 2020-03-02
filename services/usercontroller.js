'use strict'
const express = require("express");
const router = express.Router();
const userBL = require('../BL/user.bl');
const authenticateRequest = require("../middleware/authentication.js");

router.get('/:userId',authenticateRequest,(req,res)=>{
    userBL.getUserById(req,res)
    .then((response)=>{
        return res.status(response[0]).send({data:response[1].toJSON(),message:response[2]});
    })
    .catch((response)=>{
        return res.status(response[0]).send({message:response[1],err:response[2]});
    })
});

router.get('/:userId/tasks',authenticateRequest,(req,res)=>{
        userBL.getUserTaskByTaskName(req,res)
        .then((response)=>{
            return res.status(response[0]).send({data:response[1],message:response[2]});
        })
        .catch((response)=>{
            return res.status(response[0]).send({message:response[1],err:response[2]});
        })
});

router.post('/',authenticateRequest,(req,res)=>{
    userBL.createUser(req,res)
    .then((response)=>{
        return res.status(response[0]).send({data:response[1],message:response[2]});
    })
    .catch((response)=>{
        return res.status(response[0]).send({message:response[1],err:response[2]});
    })
});

router.post('/:userId/tasks',authenticateRequest,(req,res)=>{
    userBL.createTaskForGivenUser(req,res)
    .then((response)=>{
        return res.status(response[0]).send({data:response[1],message:response[2]});
    })
    .catch((response)=>{
        return res.status(response[0]).send({message:response[1],err:response[2]});
    })
});

router.patch('/:userId/tasks',authenticateRequest,(req,res)=>{
    userBL.updateGivenUserTaskByTaskName(req,res)
    .then((response)=>{
        return res.status(response[0]).send({data:response[1],message:response[2]});
    })
    .catch((response)=>{
        return res.status(response[0]).send({message:response[1],err:response[2]});
    })
});

router.delete('/:userId/tasks',authenticateRequest,(req,res)=>{
    userBL.deleteGivenUserTaskByTaskName(req,res)
    .then((response)=>{
        return res.status(response[0]).send({data:response[1],message:response[2]});
    })
    .catch((response)=>{
        return res.status(response[0]).send({message:response[1],err:response[2]});
    })
});

module.exports = router;