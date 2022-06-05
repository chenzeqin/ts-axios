import { deepMerge, isPlainObject } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

interface MergeConfig {
  [key: string]: (val1: any, val2: any) => void
}

const mergeMap: MergeConfig = {
  valueFromConfig2
}
// 【默认合并策略】如果config2[key] 有数据，取config2[key],否则取config1[key],如 method
function defaultToConfig2(val1: any, val2: any) {
  return val2 !== undefined ? val2 : val1
}

// 只取config2数据， 如：url,data,params
function valueFromConfig2(val1: any, val2: any) {
  return val2
}

const valueFromConfig2Keys = ['url', 'params', 'data']
valueFromConfig2Keys.forEach(key => {
  mergeMap[key] = valueFromConfig2
})

// 对象深合并, 如headers
function deepMergeValue(val1: any, val2: any) {
  if (isPlainObject(val1) && isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (isPlainObject(val2)) {
    return mergeConfig(val2)
  }

  return val2
}

const deepMergeValueKeys = ['headers']
deepMergeValueKeys.forEach(key => {
  mergeMap[key] = deepMergeValue
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeValue(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeValue(key)
    }
  }

  function mergeValue(key: string) {
    const merge = mergeMap[key] || defaultToConfig2
    config[key] = merge(config1[key], config2![key])
  }

  return config
}
