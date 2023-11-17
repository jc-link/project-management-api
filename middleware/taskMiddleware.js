const { TaskService } = require("../service/taskService")

const taskService = new TaskService()

const getTask = async (req, res, next) => {
  const { id } = req.params
  let task
  try {
    task = await taskService.getById(id)
    if (task == null) {
      return res.status(404).json({ message: "Cannot find task" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.task = task
  next()
}

module.exports = getTask
