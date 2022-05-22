import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildRUL } from './helpers/url'

const axios = (config: AxiosRequestConfig) => {
  xhr(processConfig(config))
}

// 处理请求参数
function processConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  config.url = transformUrl(config)

  return config
}
// 转换url
function transformUrl(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildRUL(url, params)
}

export default axios
