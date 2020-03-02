const mongoose = require('mongoose');
const taskSchema = require("./task.model");
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    
    userId: {
        type: Number,
        required: 'userId is required.'
    },
    firstName: {
        type: String,
        required: 'firstName is required.'
    },
    lastName: {
        type: String,
        required: 'lastName is required.'
    },
    email: {
        type: String,
        unique: true,
        required: 'email is required.'
    },
    password: {
        type: String,
        //select: false,
        required: 'Password is required.'
    },
    tasks: [
        {
            name: {
                type: String,
                required: 'Task name is required.'
            },
            startDate: {
                type: Date,
                required: 'Task start date  is required.'
            },
            endDate: {
                type: Date,
                required: 'Task end date is required.'
            },
            description: {
                type: String,
                required: 'Task description is required.'
            }
        }
    ]
});

userSchema.methods.generateAuthToken = function(user) { 
    const token = jwt.sign({ userId: user.userId }, config.JWT_SECRET_TOKEN); //get the private key from the config file -> environment variable
    return token;
  }

  userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }
// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('User', userSchema);