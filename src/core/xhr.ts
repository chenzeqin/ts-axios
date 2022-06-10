import cookie from '../helpers/cookie'
import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/headers'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url = '',
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth
    } = config
    const request = new XMLHttpRequest()

    request.open(method.toLowerCase(), url, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    function configureRequest() {
      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }

      if (responseType) {
        request.responseType = responseType
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function addEvents() {
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
        reject(createError('Network Error', config, null, request))
      }

      request.ontimeout = () => {
        reject(createError(`Timeout of ${timeout}ms exceeded`, config, null, request))
      }
    }

    function processHeaders() {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if (auth) {
        const { username, password } = auth
        // btoa: 字符串--->base64
        headers['authorization'] = `Basic ` + btoa(`${username}:${password}`)
      }
      // 防止xsrf攻击
      if ((withCredentials || isURLSameOrigin(url)) && xsrfCookieName) {
        const xsfrValue = cookie.read(xsrfCookieName)
        if (xsfrValue && xsrfHeaderName) headers[xsrfHeaderName] = xsfrValue
      }

      // 设置请求头
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(message => {
          request.abort()
          reject(message)
        })
      }
    }

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 || response.status <= 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `request failed with status ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
