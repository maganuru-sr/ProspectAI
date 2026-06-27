import Task from "../models/Task.js";

// Get Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
  owner: req.user.id,
}).sort({
  createdAt: -1,
});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Task
export const addTask = async (req, res) => {
  try {
    const task = await Task.create({
  ...req.body,
  owner: req.user.id,
});
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};