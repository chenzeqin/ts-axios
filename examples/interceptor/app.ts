import axios from '../../src/index'
import type { AxiosError } from '../../src/types/index'

axios.interceptors.request.use((config) => {
  console.log(config)
  config.headers.test += 1
  return config
})
axios.interceptors.request.use((config) => {
  console.log('config2', config)

  config.headers.test += 2
  return config
})
axios.interceptors.request.use((config) => {
  config.headers.test += 3
  return config
})

axios.interceptors.response.use(response => {
  response.data += 'a'
  return response
})
const interceptorId = axios.interceptors.response.use(response => {
  response.data += 'b'
  return response
})
// 删掉一个拦截器
axios.interceptors.response.eject(interceptorId)

axios.interceptors.response.use(response => {
  response.data += 'c'
  return response
})


axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err)
})
