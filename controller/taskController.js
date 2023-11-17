const express = require("express")
const router = express.Router()
const { Task } = require("../model/task")
const { TaskDTO } = require("../dto/taskDto")
const { TaskService } = require("../service/taskService")
const taskMiddleware = require("../middleware/taskMiddleware")
const taskService = new TaskService()

// POST / - Create a new task
router.post("/", async (req, res) => {
  const { name, description, priority, dueDate, completed, projectId } =
    req.body
  const taskDTO = new TaskDTO(
    name,
    description,
    priority,
    dueDate,
    completed,
    projectId
  )

  const savedTask = await taskService.create(taskDTO)

  res.json(savedTask)
})

// GET / - Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await taskService.getAll()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /:id - Get a task by its ID
router.get("/:id", taskMiddleware, async (req, res) => {
  res.send(res.task)
})

// PATCH /:id - Update a task by its ID
router.patch("/:id", taskMiddleware, async (req, res) => {
  try {
    res.task = { ...res.task, ...req.body }
    const updatedTask = await taskService.updateById(res.task)
    res.json(updatedTask)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE /:id - Delete a task by its ID
router.delete("/:id", taskMiddleware, async (req, res) => {
  try {
    const result = await taskService.deleteById(res.task.id)
    if (result) {
      res.status(200).json({ message: "Task deleted successfully" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
