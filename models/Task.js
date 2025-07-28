const mongoose = require('mongoose');
//schema is doing everythin -> validation, data structure, to iteration, etc.
const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true, // it handles the validatoin part as well
    },
    description:{
        type: String,
    },
    status:{
        type: String,
        enum :['pending', 'in-progress', 'completed'],
        default: 'pending', // default value if not provided
    },
    dueDate: Date,
});

module.exports = mongoose.model('Task', taskSchema);