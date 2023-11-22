const mongoose = require("mongoose")
const Task = require("./task")

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: Number, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
})

projectSchema.pre("remove", async (next) => {
  try {
    await Task.deleteMany({ _id: { $in: this.tasks } })
    next()
  } catch (err) {
    next(err)
  }
})

const Project = mongoose.model("Project", projectSchema)

module.exports = { Project }
