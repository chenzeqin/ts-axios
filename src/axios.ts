import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaultConfig from './default'
import mergeConfig from './core/mergeConfig'
import Cancel, { isCancel } from './cancel/Cancel'
import { CancelToken } from './cancel/CancelToten'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // request function
  const instance = Axios.prototype.request.bind(context)

  // 把实例axios所有方法挂载到instance
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaultConfig)

axios.create = function(config?: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaultConfig, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.all = function(promises) {
  return Promise.all(promises)
}
axios.spread = function(callback) {
  return function(args) {
    return callback.apply(null, args)
  }
}
axios.Axios = Axios
export default axios
