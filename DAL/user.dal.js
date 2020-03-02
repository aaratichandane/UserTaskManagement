'use strict'

const Promise = require('promise');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const userDAL = {};

userDAL.createUser = (UserToCreate)=>{

    return new Promise((resolve,reject)=>{
        UserToCreate.save((err, user) => {
            if (!err)
            resolve(user);
            else 
            reject(err);
        });
    });
}

userDAL.getUserById = (userId)=>{
    return new Promise((resolve,reject)=>{
         User.findOne({ 'userId': userId },(err, user)=>{
            if (!err)
            resolve(user);
            else 
            reject(err);
         });
    });
}

userDAL.getUserByEmail = (email)=>{
    return new Promise((resolve,reject)=>{
         User.findOne({ 'email': email },'password',(err, user)=>{
            if (!err)
            resolve(user);
            else 
            reject(err);
         });
    });
}

userDAL.getAllUserTasks = (userId)=>{
    return new Promise((resolve,reject)=>{
         User.findOne({ 'userId': userId },"tasks",(err, tasks)=>{
            if (!err)
            resolve(tasks);
            else 
            reject(err);
         });
    });
}

userDAL.getUserTaskByTaskName = (userId,taskName)=>{
    return new Promise((resolve,reject)=>{
        User.findOne({'userId': userId,'tasks.name': taskName},"tasks", function(err, tasks){
            if (!err)
            resolve(tasks);
            else
            reject(err);
         });
    });
}

userDAL.updateUser = (userToSave)=>{
    return new Promise((resolve,reject)=>{
        userToSave.save(function(err, user){
            if (!err)
            resolve(user);
            else
            reject(err);
         });
    });
}

userDAL.getUserByIdAndTaskName = (user,taskName)=>{
    return new Promise((resolve,reject)=>{
        user.update( { $pull: { tasks : { name :  taskName} } },{ safe: true },(err, user) =>{
                if(!err)
                resolve(user);
                else
                reject(err);
            });
   });
}

module.exports = userDAL;