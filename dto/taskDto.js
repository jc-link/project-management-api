class TaskDTO {
  constructor(id, name, description, priority, dueDate, completed, projectId) {
    this.id = id
    this.name = name
    this.description = description
    this.priority = priority
    this.dueDate = dueDate
    this.completed = completed
    this.projectId = projectId
  }
}

module.exports = { TaskDTO }
