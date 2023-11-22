class ProjectDTO {
  constructor(id, name, description, priority, tasks) {
    this.id = id
    this.name = name
    this.description = description
    this.priority = priority
    this.tasks = tasks
  }
}

module.exports = { ProjectDTO }
