const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};

exports.getTaskbyId = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task); /// success case -> task found
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createTask = async (req, res) => {
    try{
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask); /// success case -> task created
    }  catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
