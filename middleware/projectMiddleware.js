const { ProjectService } = require("../service/projectService")

const projectService = new ProjectService()

const getProject = async (req, res, next) => {
  const { id } = req.params
  let project
  try {
    project = await projectService.getById(id)
    if (project == null) {
      return res.status(404).json({ message: "Cannot find project" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.project = project
  next()
}

const checkProjectFields = (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" })
    }
    const { name, description, priority } = req.body

    if (name && name.trim() === "") {
      return res.status(400).json({ message: "Name cannot be empty" })
    }

    if (description && description.trim() === "") {
      return res.status(400).json({ message: "Description cannot be empty" })
    }

    if (priority && priority === "") {
      return res.status(400).json({ message: "Priority cannot be empty" })
    }

    next()
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = { getProject, checkProjectFields }
