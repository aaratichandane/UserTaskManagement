
'use strict'

const Promise = require('promise');
const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const taskDAL = {};

taskDAL.getTaskByName = (name)=>{
    return new Promise((resolve,reject)=>{
         Task.findOne({ 'name': name },(err, user)=>{
            if (!err)
            resolve(user);
            else 
            reject(err);
         });
    });
}

taskDAL.createTask = (task)=>{
return new Promise((resolve,reject)=>{
    task.save((err, task) => {
        if (!err)
            resolve(task);
        else
        reject(err);
    });
});}

taskDAL.update = (task)=>{
    return new Promise((resolve,reject)=>{
    task.save( (err, tasks) => {
        if (!err) 
        resolve();
       else
       reject(err);
    });
    });
}

taskDAL.delete = (task)=>{
    return new Promise((resolve,reject)=>{
        Task.findByIdAndRemove(task._id, (err, tasks) => {
        if (!err) 
        resolve();
        else
        reject(err);
        });
    });
}

module.exports = taskDAL;