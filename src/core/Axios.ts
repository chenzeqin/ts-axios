/*
 * @Author: chenzq
 * @Date: 2022-05-29 14:36:08
 * @LastEditors: chenzq
 * @LastEditTime: 2022-06-13 20:14:07
 * @Description: Axios类，声明一些方法
 */

import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn
} from '../types/index'
import dispatchRequest, { transformUrl } from './dispacthRequest'
import { InterceptorManager } from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise<T>)
  rejected?: RejectedFn
}

export default class Axios {
  default: AxiosRequestConfig
  interceptors: Interceptors
  constructor(initConfig: AxiosRequestConfig) {
    this.default = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: string | AxiosRequestConfig, config?: AxiosRequestConfig): AxiosPromise {
    // 重载
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    // 合并配置
    config = mergeConfig(this.default, config)

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest
      }
    ]

    // 请求拦截器，先添加，后调用
    this.interceptors.request.forEach(interceptor => {
      console.log(interceptor)
      chain.unshift(interceptor)
    })
    // 响应拦截器，先添加，先调用
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise as AxiosPromise
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

  getUri(config: AxiosRequestConfig) {
    config = mergeConfig(this.default, config)

    return transformUrl(config)
  }
}
