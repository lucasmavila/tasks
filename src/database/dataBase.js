import { randomUUID } from 'crypto'
import fs from 'fs/promises'
const dataBasePath = new URL('db.json', import.meta.url)

class Database {
  #database = {
    tasks: []
  }

  constructor(){
    this.#load()
  }

  async #load(){
    await fs.readFile(dataBasePath, 'utf-8')
      .then(data => this.#database = JSON.parse(data))
      .catch(() => this.#persist())
    console.log('database complete')
  }

  async #persist(){
    await fs.writeFile(dataBasePath, JSON.stringify(this.#database))
  }

  async insert(table, data){

    this.#database[table].push(data)
    await this.#persist()

    return completeData
  }

  getData(table, filter){
    let data = this.#database[table] ?? []

    if(filter){
      data = data.filter(row => Object.entries(filter).some(([key, value]) => {
        return row[key].toLowerCase().includes(value.toLowerCase())
      }))
    }
    return data
  }

  getById(table, id){
    return this.#database[table].find(row => row.id === id)
  }

  update(table, id, data){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(!data){
      throw new Error('No data to update')
    }
    
    if(rowIndex > -1){
      const temp = {...this.#database[table][rowIndex], ...data, updated_at: new Date().toISOString()}
      this.#database[table][rowIndex] = temp
      this.#persist()
      return temp
    }else{
      throw new Error('Not Found')
    }
  }

  delete(table, id){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1){
      this.#database[table].splice(rowIndex,1)
      this.#persist()
    }
  }

}

const database = new Database()

export default database;