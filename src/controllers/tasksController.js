import database from "../database/dataBase.js"
import { BadRequest, NotFound } from "./ErrorHandler.js"

export class TasksController {
  constructor(){
    console.log('controller complete')
  }
  
  async createTask(req, res){
    try {
      
      const {title, description} = req.body

      if(!title){
        throw new BadRequest('title is required')
      }
      if(!description){
        throw new BadRequest('description is required')
      }


      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      
      const result = await database.insert('tasks', task)

      res.writeHead(201).end(JSON.stringify(result))  
    }
    catch (error) {
      if(error instanceof BadRequest){
        return res.writeHead(400).end(JSON.stringify({message: error.message}))
      }
      return res.writeHead(500).end(JSON.stringify({message: error.message}))
    }
  }

  async getTasks(req, res){
    try {
      const queryLength = Object.keys(req.query).length
      const result = database.getData('tasks', queryLength > 0 ? req.query : null)
      return res.end(JSON.stringify(result))
    } catch (error) {
      return res.writeHead(500).end(JSON.stringify({message: error.message}))
    }
  }

  async getTaskById(req, res){
    try {
      const {id} = req.params
      const result = database.getById('tasks', id)
      if(result){
        return res.end(JSON.stringify(result))
      }else{
        throw new NotFound()  
      }
    } catch (error) {
      if(error instanceof NotFound){
        return res.writeHead(404).end()
      }
      return res.writeHead(500).end(JSON.stringify({message: error.message}))
    }
  }
  
  async updateTask(req, res){
    try {
      const {id} = req.params
      
      const findedTask = database.getById('tasks', id)
      
      if(findedTask){

        if(req.body != null && Object.keys(req.body ?? {}).length>0){

          const title = req.body.title ?? findedTask.title
          const description = req.body.description ?? findedTask.description

          const result = database.update('tasks', id, {title, description})
          return res.end(JSON.stringify(result))

        }else{
          throw new BadRequest('No data to update')
        }
        
      }else{
        throw new NotFound('Task not founded')
      }

    } catch (error) {
      if(error instanceof NotFound){
        return res.writeHead(404).end({message: error.message})
      }
      if(error instanceof BadRequest){
        return res.writeHead(400).end(JSON.stringify({message: error.message}))
      }
      return res.writeHead(500).end(JSON.stringify({message: error.message}))
    }
  }

  async deleteTask(req, res){
    try {

      const {id} = req.params
      
      const findedTask = database.getById('tasks', id)
      if(findedTask){

        database.delete('tasks', id)
        return res.writeHead(204).end()
      }else{
        throw new NotFound('Task not founded')
      }
      
    } catch (error) {
      return res.writeHead(500).end(JSON.stringify({message: error.message}))
    }
  }

  async completeTask(req, res){
    try {

      const {id} = req.params
      
      const findedTask = database.getById('tasks', id)
      if(findedTask){

        const title = findedTask.title
        const description = findedTask.description
        const completed_at = new Date().toISOString()

        const result = database.update('tasks', id, {title, description, completed_at})
        return res.end(JSON.stringify(result))
      }else{
        throw new NotFound('Task not founded')
      }
      
    } catch (error) {
      return res.writeHead(500).end(JSON.stringify({message: error.message}))
    }
  }
}