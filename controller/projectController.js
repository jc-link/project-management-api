const { ProjectDTO } = require("../dto/ProjectDTO") // Fix casing issue here
const express = require("express")
const { ProjectService } = require("../service/projectService")
const {
  checkProjectFields,
  getProject,
} = require("../middleware/projectMiddleware")
const logger = require("../utils/logger")
const router = express.Router()
const projectService = new ProjectService()
const controllerName = "projectController"

router.post("/", async (req, res) => {
  const { name, description, priority, tasks } = req.body
  logger.info(
    `JSON: ${JSON.stringify(req.body)} in ${req.method} ${controllerName}`
  )
  const projectDTO = new ProjectDTO("", name, description, priority, tasks)
  const savedProject = await projectService.create(projectDTO)
  res.json(savedProject)
})

router.get("/", async (req, res) => {
  logger.info(`${req.method} ${controllerName}`)
  try {
    const projects = await projectService.getAll()
    res.json(projects)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  logger.info(`ID: '${id}' in ${req.method} ${controllerName}`)
  try {
    const project = await projectService.getById(id)
    res.json(project)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch("/:id", checkProjectFields, getProject, async (req, res) => {
  res.project = { ...res.project, ...req.body }
  logger.info(
    `JSON: ${JSON.stringify(req.body)} in ${req.method} ${controllerName}`
  )
  try {
    const updatedProject = await projectService.updateById(res.project)
    res.json(updatedProject)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete("/:id", getProject, async (req, res) => {
  logger.info(`ID: '${req.params.id}' in ${req.method} ${controllerName}`)
  try {
    const result = await projectService.deleteById(res.project.id)
    if (result) {
      res.status(200).json({ message: "Project deleted successfully" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
