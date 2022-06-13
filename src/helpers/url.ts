import { isDate, isPlainObject, encode, isURLSearchParams } from './util'
interface URLOrigin {
  protocol: string
  host: string
}
export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!params) {
    return url
  }
  let serializedParams = ''

  // 传入了 paramsSerializer 优先级最高
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
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

    serializedParams = parts.join('&')
  }

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

export function isAbsoluteURL(url: string): boolean {
  return /([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeUrl?: string): string {
  if (!relativeUrl) {
    return baseURL
  }

  if (isAbsoluteURL(baseURL)) {
    return `${baseURL.replace(/\/+$/, '')}/${relativeUrl.replace(/^\/+/i, '')}`
  }

  return baseURL
}

// url是否和当前域同源
export function isURLSameOrigin(url: string): boolean {
  const targetOrgin = resolveUrl(url)

  return targetOrgin.protocol === currentOrigin.protocol && targetOrgin.host === currentOrigin.host
}

const a = document.createElement('a')
const currentOrigin = resolveUrl(window.location.href)
function resolveUrl(url: string): URLOrigin {
  a.setAttribute('url', url)
  const { protocol, host } = a

  return {
    protocol,
    host
  }
}
