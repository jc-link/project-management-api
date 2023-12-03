const { TaskService } = require("../../service/taskService")
const { Task } = require("../../model/task")
const { ProjectService } = require("../../service/projectService")
const logger = require("../../utils/logger")

jest.mock("../../model/task")
jest.mock("../../service/projectService")
jest.mock("../../utils/logger")

describe("TaskService", () => {
  let taskService
  const task = {
    id: 1,
    name: "task",
    description: "Hello here",
    priority: 9,
    dueDate: "2023-12-30T20:28:24.844Z",
    completed: false,
    projectId: "123",
  }

  const tasks = [
    {
      id: 1,
      name: "task",
      description: "Hello here",
      priority: 9,
      dueDate: "2023-12-30T20:28:24.844Z",
      completed: false,
      projectId: "123",
    },
    {
      id: 2,
      name: "task2",
      description: "Hello here",
      priority: 9,
      dueDate: "2023-12-30T20:28:24.844Z",
      completed: false,
      projectId: "123",
    },
  ]

  beforeEach(() => {
    taskService = new TaskService()
  })

  describe("getAll", () => {
    it("should return all tasks", async () => {
      const taskDTOs = taskService.mapToDTOs(tasks)

      Task.find = jest.fn().mockResolvedValue(tasks)

      const result = await taskService.getAll()

      expect(Task.find).toHaveBeenCalled()
      expect(result).toEqual(taskDTOs)
    })
  })

  describe("create", () => {
    it("Should save a task and return it", async () => {
      const taskDTO = taskService.mapToDTO(task)
      Task.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(task),
      }))
      taskService.projectService.updateTasks = jest
        .fn()
        .mockResolvedValue(undefined)
      logger.info = jest.fn()

      const result = await taskService.create(taskDTO)
      expect(Task).toHaveBeenCalledWith(taskDTO)
      expect(result).toEqual(taskDTO)
    })
  })

  describe("getById", () => {
    it("Should return a task by id", async () => {
      const taskDTO = taskService.mapToDTO(task)
      Task.findById = jest.fn().mockResolvedValue(task)

      const result = await taskService.getById(task.id)

      expect(Task.findById).toHaveBeenCalledWith(task.id)
      expect(result).toEqual(taskDTO)
    })
  })

  describe("updateById", () => {
    it("Should update a task by id", async () => {
      const taskDTO = taskService.mapToDTO(task)
      Task.findOneAndUpdate = jest.fn().mockResolvedValue(task)
      logger.info = jest.fn()

      const result = await taskService.updateById(taskDTO)

      expect(Task.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: taskDTO.id },
        taskDTO,
        { new: true }
      )
      expect(result).toEqual(taskDTO)
    })
  })

  describe("deleteById", () => {
    it("Should delete a task by id", async () => {
      const taskDTO = taskService.mapToDTO(task)
      Task.findByIdAndDelete = jest.fn().mockResolvedValue(task)
      taskService.projectService.deleteTask = jest.fn().mockResolvedValue(true)

      const result = await taskService.deleteById(taskDTO)

      expect(Task.findByIdAndDelete).toHaveBeenCalledWith(taskDTO.id)
      expect(taskService.projectService.deleteTask).toHaveBeenCalledWith(
        taskDTO.projectId,
        taskDTO.id
      )
      expect(result).toEqual(true)
    })
  })
})
