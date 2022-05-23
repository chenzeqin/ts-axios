import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null, headers } = config

  const request = new XMLHttpRequest()
  request.open(method.toLowerCase(), url, true)

  // 设置请求头
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.onreadystatechange = event => {
    if (request.readyState === 4) {
      // done
    }
  }
  request.send(data)
}
