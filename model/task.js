const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
})

const Task = mongoose.model("Task", taskSchema)

module.exports = { Task }
