import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null, params = null } = config

  const request = new XMLHttpRequest()
  request.open(method.toLowerCase(), url, true)

  request.onreadystatechange = event => {
    if (request.readyState === 4) {
      // done
    }
  }
  request.send(data)
}
