import { deepMerge, isPlainObject } from './util'

// 处理headername 大小写问题
function normalizeHeaderName(headers: any, normalizeName: string) {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any = {}, data: any) {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json;chartset=utf-8'
  }

  return headers
}

// 转换 responseHeaders
export function parseHeaders(headers: string) {
  const headerOjb = Object.create(null)
  if (!headerOjb) {
    return headerOjb
  }

  // 通过换行符分割
  headers.split('\r\n').forEach(row => {
    const [key, value] = row.split(':')
    if (key) {
      headerOjb[key.trim().toLowerCase()] = (value || '').trim()
    }
  })

  return headerOjb
}

export function flattenHeaders(headers: any, method: string): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methods = ['common', 'get', 'delete', 'options', 'head', 'post', 'put', 'patch']
  methods.forEach(method => {
    delete headers[method]
  })

  return headers
}
