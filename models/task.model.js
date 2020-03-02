const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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
});

mongoose.model('Task', taskSchema);