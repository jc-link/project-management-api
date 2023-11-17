class TaskDTO {
  constructor(name, description, priority, dueDate, completed, projectId, id) {
    this.name = name
    this.description = description
    this.priority = priority
    this.dueDate = dueDate
    this.completed = completed
    this.projectId = projectId
    this.id = id
  }
}

module.exports = { TaskDTO }
