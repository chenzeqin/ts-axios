const toString = Object.prototype.toString

export function isDate(val: any) {
  return toString.call(val) === '[object Date]'
}

export function isPlainObject(val: any) {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 编码，特殊符号不编码
export function encode(val: string) {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
/* obj1,obj2, obj3... */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      const val = obj[key]

      if (isPlainObject(val)) {
        // 如果已经存在值，再拿出来合并一次
        if (isPlainObject(result[key])) {
          result[key] = deepMerge(result[key], val)
        } else {
          result[key] = deepMerge(val)
        }
      } else {
        result[key] = val
      }
    })
  })

  return result
}

export function isFormData(val: any): val is FormData {
  return val && val instanceof FormData
}
