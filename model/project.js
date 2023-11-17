const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: Number, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
})

const Project = mongoose.model("Project", projectSchema)

module.exports = Project
