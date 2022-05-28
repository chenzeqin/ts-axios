const toString = Object.prototype.toString

export function isDate(val: any) {
  return toString.call(val) === '[object Date]'
}

export function isPlainObject(val: any) {
  return toString.call(val) === '[object Object]'
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
