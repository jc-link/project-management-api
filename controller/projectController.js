const express = require("express")
const router = express.Router()
const { Project } = require("../model/project")

router.post("/projects", async (req, res) => {
  const { name, description, priority, tasks } = req.body
  const projectDTO = new ProjectDTO(name, description, priority, tasks)
  const project = new Project(projectDTO)
  await project.save()
  res.json(projectDTO)
})

module.exports = router
