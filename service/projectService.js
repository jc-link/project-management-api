const { Project } = require("./models")
const { ProjectDTO } = require("./dto")

class ProjectService {
  async create(projectDTO) {
    const project = new Project(projectDTO)
    await project.save()
    return projectDTO
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
    return this.mapToDTO(updatedProject)
  }

  async deleteById(id) {
    await Project.findByIdAndDelete(id)
    return true
  }

  mapToDTOs(projects) {
    const projectsDTOs = projects.map((project) => this.mapToDTO(project))
    return projectsDTOs
  }

  mapToDTO(project) {
    const projectDTO = new ProjectDTO(
      project.name,
      project.description,
      project.priority,
      project.tasks,
      project._id
    )
    return projectDTO
  }
}

module.exports = { ProjectService, TaskService }
