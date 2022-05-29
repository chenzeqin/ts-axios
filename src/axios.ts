import { AxiosInstance, Axios as IAxios } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance() {
  const context = new Axios()
  // request function
  const instance = Axios.prototype.request.bind(context)

  // 把实例axios所有方法挂载到instance
  extend(instance, context)

  return instance as AxiosInstance & IAxios
}

const axios = createInstance()

export default axios
