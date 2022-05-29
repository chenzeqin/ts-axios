import { AxiosRequestConfig, AxiosResponse } from './types/index'
import xhr from './xhr'
import { buildRUL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

const axios = (config: AxiosRequestConfig) => {
  return xhr(processConfig(config)).then(response => {
    return transformResponseData(response)
  })
}

// 处理请求参数
function processConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  config.url = transformUrl(config)
  // 在处理data之前处理headers
  config.headers = transformHeader(config)
  config.data = transformRequestData(config)

  return config
}
// 转换url
function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildRUL(url, params)
}
// 转换request data
function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}
// 转换headers
function transformHeader(config: AxiosRequestConfig) {
  const { headers, data } = config
  return processHeaders(headers, data)
}
// 转换response data
function transformResponseData(response: AxiosResponse) {
  response.data = transformResponse(response.data)

  return response
}

export default axios
