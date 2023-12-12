import { buildPathRegex } from "./utils/buildPathRegex.js"
import database from "./database/dataBase.js"
import { TasksController } from "./controllers/tasksController.js"

const tasksController = new TasksController(database)

export const routes = [
  {
    method: 'GET',
    pathRegex: buildPathRegex('/'),
    handler: (req, res)=>{
      res.end('Hello Word! - Welcome to Tasks')
    }
  },
  {
    method: 'GET',
    pathRegex: buildPathRegex('/tasks'),
    handler: tasksController.getTasks
  },
  {
    method: 'GET',
    pathRegex: buildPathRegex('/tasks/:id'),
    handler: tasksController.getTaskById
  },
  {
    method: 'POST',
    pathRegex: buildPathRegex('/tasks'),
    handler: tasksController.createTask
  },
  {
    method: 'PUT',
    pathRegex: buildPathRegex('/tasks/:id'),
    handler: tasksController.updateTask
  },
  {
    method: 'DELETE',
    pathRegex: buildPathRegex('/tasks/:id'),
    handler: tasksController.deleteTask
  },
  {
    method: 'PATCH',
    pathRegex: buildPathRegex('/tasks/:id/complete'),
    handler: tasksController.completeTask
  }
]