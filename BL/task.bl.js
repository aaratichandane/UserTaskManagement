'use strict'

const Promise = require('promise');
const mongoose = require('mongoose');
const Task = mongoose.model('Task');
//const Task = require('../models/task.model');
const taskDAL = require('../DAL/task.dal');
const taskBL = {};


taskBL.delete = (task)=>{
    return new Promise((resolve,reject)=>{

        taskDAL.delete(task)
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            reject(err);
        });  
    });
};

taskBL.getTaskSchema = (req)=>{

    var taskArray = [];
    req.body.tasks.forEach(taskToCreate => {
        var task = new Task();
    task.name = taskToCreate.name;
    task.startDate = taskToCreate.startDate;
    task.endDate = taskToCreate.endDate;
    task.description = taskToCreate.description;
    taskArray.push(task);
    });
    
    return taskArray;
}
module.exports = taskBL;