import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'

const axios = (params: AxiosRequestConfig) => {
  xhr(params)
}

export default axios
