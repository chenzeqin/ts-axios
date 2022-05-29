import axios from '../../src/index'
import type { AxiosError } from '../../src/index'

axios({
  url: '/error/random',
  method: 'get',
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err.message)
  console.log(err.config)
  console.log(err.request)
})

axios({
  url: '/error/timeout',
  method: 'get',
  timeout: 3000
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err.message)
  console.log(err.config)
  console.log(err.request)
})
