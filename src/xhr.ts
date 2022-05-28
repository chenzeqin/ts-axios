import { parseHeaders } from './helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()

    if (timeout) {
      request.timeout = timeout
    }

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
      // timeout 不加该判断时，会执行下面逻辑，从而不执行ontimeout
      if (request.status === 0) {
        return
      }

      // 为什么要！判断， 因为responseType默认是undefined
      const responseData = responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        headers: parseHeaders(request.getAllResponseHeaders()),
        status: request.status,
        data: responseData,
        request: request,
        config
      }
      handleResponse(response)
    }

    request.onerror = () => {
      reject(new Error('Networe Error'))
    }

    request.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout}ms exceeded`))
    }

    request.send(data)

    function handleResponse(response: AxiosResponse) {
      console.log(response.status)
      if (response.status >= 200 || response.status <= 300) {
        resolve(response)
      } else {
        reject(`request failed with status ${response.status}`)
      }
    }
  })
}
