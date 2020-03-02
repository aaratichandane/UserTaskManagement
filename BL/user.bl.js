'use strict'

const Promise = require('promise');
const mongoose = require('mongoose');
const User = mongoose.model('User');
//const User = require('../models/user.model');
const userDAL = require('../DAL/user.dal');
const taskBL = require('../BL/task.bl');
const encryptorUtils = require('../utils/encrypterutils.js');
const userBL = {};

userBL.createUser = (req,res)=>{

    return new Promise((resolve,reject)=>{
    
    var userToCreate = userBL.getUserSchema(req)
    if(req.body.tasks &&  req.body.tasks.length > 0){
    
        userToCreate.tasks = taskBL.getTaskSchema(req);
        userDAL.createUser(userToCreate)
            .then((user)=>{
                resolve([200,user,"User created successfully"]);
            })
            .catch((err)=>{
                reject([500,"Something went wrong",err]);
            });
    }
    else{
       //Create user without task
        userDAL.createUser(userToCreate)
        .then((user)=>{
            resolve([200,user,"User created successfully"]);
        })
        .catch((err)=>{
            reject([500,"Something went wrong",err]);
        });
    }

    });
};

userBL.getUserById = (req,res)=>{
    return new Promise((resolve,reject)=>{
        
        userDAL.getUserById(req.params.userId)
        .then((user)=>{
            if(user)
                resolve([200,user,"User fetched successfully"]);
            else
            resolve([200,null,"User not found"]);
        })
        .catch((err)=>{
            reject([500,"Something went wrong",err]);
        });
    })
}

userBL.getUserByEmail = (req,res)=>{
    return new Promise((resolve,reject)=>{
        userDAL.getUserByEmail(req.body.email)
        .then((user)=>{
            resolve(user);
        })
        .catch((err)=>{
            reject([500,"Something went wrong",err]);
        });
    })
}

userBL.getAllUserTasks = (req,res)=>{
    return new Promise((resolve,reject)=>{
        userDAL.getAllUserTasks(req.params.userId)
        .then((tasks)=>{
            resolve(tasks);
        })
        .catch((err)=>{
            reject([500,"Something went wrong",err]);
        });
    })
}

userBL.getUserTaskByTaskName = (req,res)=>{
    return new Promise((resolve,reject)=>{
        
        userBL.getUserById(req)
        .then((response)=>{
            if(response[1]){
                if(req.query.name){
                    const tasks = response[1].tasks.find(obj => obj.name == req.query.name);
                    if(tasks)
                    resolve([200,tasks,"User tasks fetched successfully"]);
                    else
                    resolve([200,{},"User tasks fetched successfully"]);
                }
                else
                resolve([200,response[1],"User tasks fetched successfully"]);
            }
            else
            resolve([404,null,"User not found"]);
        })
        .catch((err)=>{
            reject([500,"Something went wrong",err]);
        });
    })
}

userBL.createTaskForGivenUser = (req,res)=>{

    return new Promise((resolve,reject)=>{
    
        userBL.getUserById(req,res)
        .then((response)=>{
            if(response[1]){
                     //Create the task for user
                     if(req.body.tasks && req.body.tasks.length>0){
                        response[1].tasks = response[1].tasks.concat(taskBL.getTaskSchema(req));

                        userDAL.updateUser(response[1])
                        .then((response)=>{
                            resolve([200,response[1],"Task added for the user successfully"]);
                        })
                        .catch((err)=>{
                            reject([500,"Something went wrong",err]);
                        });
                     }
                     else
                     reject([400,"Task object can not be empty",null]);
            }
            else
            resolve([404,null,"User not found"]);
        })
        .catch((err)=>{
            reject([500,"Something went wrong",err]);
        });
    });
};

userBL.updateGivenUserTaskByTaskName = (req,res)=>{
    return new Promise((resolve,reject)=>{
        userBL.getUserById(req)
        .then((response)=>{ 
            if(response[1]){
                let taskToUpdate = response[1].tasks.find(obj => obj.name == req.query.name);
                if(taskToUpdate){
                    if(req.body.description)
                    taskToUpdate = userBL.getUpdatedTaskObj(taskToUpdate,req)
                    userDAL.updateUser(response[1])            
                    .then((task)=>{
                        resolve([200,taskToUpdate,"Task updated successfully"]);
                    })
                    .catch((err)=>{
                        reject([500,"Something went wrong",err]);
                    });
                }
                else{
                    resolve([200,null,"Task with given name not found "]);
                }
            }
            else{
                resolve([404,null,"User not found"]);
            }
        })
        .catch((err)=>{
            reject([500,"Something went wrong",err]);
        });
    });
}

userBL.deleteGivenUserTaskByTaskName = (req,res)=>{

    return new Promise((resolve,reject)=>{
        userBL.getUserById(req)
        .then((response)=>{   
            if(response[1]){
                    if(req.query.name){
                        var taskMatched = response[1].tasks.find(obj => obj.name == req.query.name);
                        if(taskMatched){
                            response[1].update( { $pull: { tasks : { name :  req.query.name} } },{ safe: true },(err, user)=> {
                                if(!err)
                                resolve([200,null,"Task deleted "]);
                                else
                                reject([500,"Something went wrong",err]);
                            })
                        }
                        else
                        resolve([200,null,"Task with given name not found "]);
                    }
                    else
                    resolve([404,null,"Task name query param is missing"]);
        }
        else
        resolve([404,null,"User not found"]);
          
        })
        .catch((err)=>{
            reject([500,"Something went wrong",err]);
        });
    });
}

userBL.getUserSchema = (req)=>{
    var user = new User();
    user.userId = req.body.userId;
    user.firstName = req.body.firstName;
    user.email = req.body.email;
    user.lastName = req.body.lastName;
    user.password = encryptorUtils.encrypt(req.body.password);
    return user;
}

userBL.getUpdatedTaskObj = (taskToUpdate,req)=>{
    if(req.body.description)
    taskToUpdate.description = req.body.description;
    if(req.body.startDate)
    taskToUpdate.startDate = req.body.startDate;
    if(req.body.endDate)
    taskToUpdate.endDate = req.body.endDate;
    return taskToUpdate;
}

(()=> {
    userDAL.getUserByEmail(config.DEFAULT_ADMIN_USER.email)
    .then((user)=>{
        if(user)
        console.log("Admin user created successfully");
        else
        {
            var adminUser = new User();
            adminUser.userId = config.DEFAULT_ADMIN_USER.userId;
            adminUser.firstName = config.DEFAULT_ADMIN_USER.firstName;
            adminUser.email = config.DEFAULT_ADMIN_USER.email;
            adminUser.lastName = config.DEFAULT_ADMIN_USER.lastName;
            adminUser.password = encryptorUtils.encrypt(config.DEFAULT_ADMIN_USER.password);
            userDAL.createUser(adminUser)
            .then((user)=>{
                console.log("Admin user created successfully");
            })
            .catch((err)=>{
                console.log("Error while creating default user");
            });
        }
    })
    .catch((err)=>{
        reject([500,"Something went wrong",err]);
    });
  })()
module.exports = userBL;