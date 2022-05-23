/*
 * @Author: chenzq
 * @Date: 2022-05-23 23:08:00
 * @LastEditors: chenzq
 * @LastEditTime: 2022-05-23 23:14:39
 * @Description: 处理请求data或者响应data
 */

import { isPlainObject } from './util'

export function transformRequest(data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
