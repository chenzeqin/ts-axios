/*
 * @Author: chenzq
 * @Date: 2022-05-29 14:36:08
 * @LastEditors: chenzq
 * @LastEditTime: 2022-05-29 23:05:25
 * @Description: Axios类，声明一些方法
 */

import { AxiosRequestConfig, Method } from '../types/index'
import dispatchRequest from './dispacthRequest'

export default class Axios {
  request(config: AxiosRequestConfig) {
    return dispatchRequest(config)
  }

  // _requestWithNoData
  get(url: string, config?: AxiosRequestConfig) {
    return this._requestWithNoData('get', url, config)
  }
  head(url: string, config?: AxiosRequestConfig) {
    return this._requestWithNoData('head', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig) {
    return this._requestWithNoData('delete', url, config)
  }
  options(url: string, config?: AxiosRequestConfig) {
    return this._requestWithNoData('options', url, config)
  }

  // _requestWithData
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestWithData('patch', url, data, config)
  }

  _requestWithNoData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
