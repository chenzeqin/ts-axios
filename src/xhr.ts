import { parseHeaders } from './helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

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
      if (request.readyState !== 4) {
        return
      }

      const responseData = responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        headers: parseHeaders(request.getAllResponseHeaders()),
        status: request.status,
        data: responseData,
        request: request,
        config
      }
      resolve(response)
    }
    request.onerror = err => {
      reject(err)
    }
    request.send(data)
  })
}
