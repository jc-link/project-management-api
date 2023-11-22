require("dotenv").config()
const express = require("express")
const testController = require("./controller/test")
const taskController = require("./controller/taskController")
const projectController = require("./controller/projectController")
const dbConnection = require("./service/dbConnection")
const errorHandler = require("./middleware/errorHandler")
const PORT = process.env.PORT
const app = express()

dbConnection()

app.use(express.json())
app.use("/test", testController)
app.use("/task", taskController)
app.use("/project", projectController)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`))
