import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxiosRequestConfig } from './types'

const defaultConfig: AxiosRequestConfig = {
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)

      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

const methodsWithNoData = ['get', 'delete', 'options', 'head']
methodsWithNoData.forEach(method => [(defaultConfig.headers[method] = {})])

const methodsWithData = ['post', 'patch', 'put']
methodsWithData.forEach(method => [
  (defaultConfig.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  })
])

export default defaultConfig
