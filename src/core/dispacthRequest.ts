import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types/index'
import xhr from './xhr'
import { buildURL, combineURL, isAbsoluteURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCanceledBeforeRequest(config)

  return xhr(processConfig(config)).then(response => {
    return transformResponseData(response)
  })
}

// 处理请求参数
function processConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  config.url = transformUrl(config)
  // processHeaders transformRequest 移到默认配置的transformRequest中了
  config.data = transform(config.data, config.headers, config.transformRequest)
  // transformHeader 为了当 datas是object时，添加content-type:application/json之后在flattenHeaders
  config.headers = flattenHeaders(config.headers, config.method!)

  return config
}
// 转换url
export function transformUrl(config: AxiosRequestConfig) {
  let { url, params, paramsSerializer, baseURL } = config

  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url || '', params, paramsSerializer)
}

// 转换response data
function transformResponseData(response: AxiosResponse): AxiosResponse {
  response.data = transform(response.data, response.headers, response.config.transformResponse)

  return response
}

function throwIfCanceledBeforeRequest(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfCanceled()
  }
}
