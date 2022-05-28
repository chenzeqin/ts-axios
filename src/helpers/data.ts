/*
 * @Author: chenzq
 * @Date: 2022-05-23 23:08:00
 * @LastEditors: chenzq
 * @LastEditTime: 2022-05-29 04:41:43
 * @Description: 处理请求data或者响应data
 */

import { isPlainObject } from './util'

export function transformRequest(data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
      console.log(data)
    } catch (error) {
      console.info('转换失败')
    }
  }

  return data
}
