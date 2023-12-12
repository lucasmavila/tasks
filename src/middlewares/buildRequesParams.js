import {extractQueryParams} from '../utils/extractQuery.js'
export function buildRequesParams(req, route){
  const routeParams = req.url.match(route.pathRegex).groups

  const {query, ...params} = routeParams

  req.query = query ? extractQueryParams(query) : {}
  req.params = params
}