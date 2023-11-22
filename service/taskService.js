const { TaskDTO } = require("../dto/taskDto")
const { Task } = require("../model/task")
const { ProjectService } = require("./projectService")
const logger = require("../utils/logger")

class TaskService {
  constructor() {
    this.projectService = new ProjectService()
  }
  async create(taskDTO) {
    const task = new Task(taskDTO)
    try {
      const savedTask = await task.save()
      await this.projectService.updateTasks(savedTask.projectId, savedTask)
      logger.info(`Task saved: '${savedTask}'`)
      return this.mapToDTO(savedTask)
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  async getAll() {
    const tasks = await Task.find()
    return this.mapToDTOs(tasks)
  }

  async getById(id) {
    const task = await Task.findById(id)
    if (task == null) {
      throw new Error("Cannot find task")
    }
    return this.mapToDTO(task)
  }

  async updateById(taskDTO) {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskDTO.id },
      taskDTO,
      { new: true }
    )
    logger.info(`Task updated: '${updatedTask}'`)
    return this.mapToDTO(updatedTask)
  }

  async deleteById(task) {
    const { id, projectId } = task
    try {
      await Task.findByIdAndDelete(id)
      await this.projectService.deleteTask(projectId, id)
      logger.info(`Task deleted: '${id}'`)
      return true
    } catch (err) {
      logger.error(err)
      throw err
    }
  }

  mapToDTOs(tasks) {
    const tasksDTOs = tasks.map((task) => this.mapToDTO(task))
    return tasksDTOs
  }
  mapToDTO(task) {
    const taskDTO = new TaskDTO(
      task._id,
      task.name,
      task.description,
      task.priority,
      task.dueDate,
      task.completed,
      task.projectId
    )
    return taskDTO
  }
}

module.exports = { TaskService }
