import http from 'node:http'
import { routes } from './routes.js'
import { jsonBuffer } from './middlewares/jsonBuffer.js'
import { buildRequesParams } from './middlewares/buildRequesParams.js'

const port = 3000

const server = http.createServer(async (req, res)=>{

  const {method, url } = req

  if(req.headers['content-type'] === 'application/json'){

    await jsonBuffer(req, res)

    const route = routes.find(route => {
      return route.method === method && route.pathRegex.test(url)
    })
    
    if(route){
      buildRequesParams(req, route)
      return route.handler(req, res)
    }
  
    return res.writeHead(404).end()
  }

  return res.writeHead(400).end('Content-type not permitted')

})

server.listen(port, ()=> console.log('Taks server online'))

