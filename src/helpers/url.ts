import { isDate, isPlainObject, encode } from './util'

export function buildRUL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value === undefined || value === null) {
      return
    }
    // 统一处理为数组
    let values = []
    if (Array.isArray(value)) {
      key += '[]'
      values = value
    } else {
      values = [value]
    }

    // 拼接参数
    values.forEach(val => {
      if (isDate(val)) {
        val = (val as Date).toISOString()
      }
      if (isPlainObject(val)) {
        val = JSON.stringify(val as Object)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    // 去掉锚点# （对于后端没有用）
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 如果有？ 继续拼接&,否则加上?
    url += url.indexOf('?') !== -1 ? `&${serializedParams}` : `?${serializedParams}`
  }
  return url
}
