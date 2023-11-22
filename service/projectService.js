const { Project } = require("../model/project")
const { ProjectDTO } = require("../dto/ProjectDTO")
const { Task } = require("../model/task")
const logger = require("../utils/logger")

class ProjectService {
  async create(projectDTO) {
    const project = new Project(projectDTO)
    const newProject = await project.save()
    logger.info(`Project saved: '${newProject}'`)
    return this.mapToDTO(newProject)
  }

  async getAll() {
    const projects = await Project.find()
    return this.mapToDTOs(projects)
  }

  async getById(id) {
    const project = await Project.findById(id)
    if (project == null) {
      throw new Error("Cannot find project")
    }
    return this.mapToDTO(project)
  }

  async updateById(projectDTO) {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectDTO.id },
      projectDTO,
      { new: true }
    )
    logger.info(`Project updated: '${updatedProject}'`)
    return this.mapToDTO(updatedProject)
  }

  async updateTasks(projectId, task) {
    try {
      await Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } })
      logger.info(`Task: '${task._id}' added to project: '${projectId}'`)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async deleteTask(projectId, taskId) {
    try {
      await Project.findByIdAndUpdate(projectId, { $pull: { tasks: taskId } })
      logger.info(`Task: '${taskId}' removed from project: '${projectId}'`)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async deleteById(id) {
    const project = await Project.findById(id)
    if (!project) {
      throw new Error("Cannot find project")
    }

    for (const taskId of project.tasks) {
      await Task.deleteOne({ _id: taskId })
      logger.info(`Task: '${taskId}' deleted`)
    }

    await Project.deleteOne({ _id: id })
    logger.info(`Project: '${id}' deleted`)
    return true
  }

  mapToDTOs(projects) {
    const projectsDTOs = projects.map((project) => this.mapToDTO(project))
    return projectsDTOs
  }

  mapToDTO(project) {
    const projectDTO = new ProjectDTO(
      project._id,
      project.name,
      project.description,
      project.priority,
      project.tasks
    )
    return projectDTO
  }
}

module.exports = { ProjectService }
