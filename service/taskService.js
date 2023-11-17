const { TaskDTO } = require("../dto/taskDto")
const { Task } = require("../model/task")

class TaskService {
  async create(taskDTO) {
    const task = new Task(taskDTO)
    const newTask = await task.save()
    return this.mapToDTO(newTask)
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
    console.log(taskDTO)
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskDTO.id },
      taskDTO,
      { new: true }
    )
    console.log(`updatedTask: ${updatedTask}`)
    return this.mapToDTO(updatedTask)
  }

  async deleteById(id) {
    await Task.findByIdAndDelete(id)
    return true
  }

  mapToDTOs(tasks) {
    const tasksDTOs = tasks.map((task) => this.mapToDTO(task))
    return tasksDTOs
  }
  mapToDTO(task) {
    const taskDTO = new TaskDTO(
      task.name,
      task.description,
      task.priority,
      task.dueDate,
      task.completed,
      task.projectId,
      task._id
    )
    return taskDTO
  }
}

module.exports = { TaskService }
