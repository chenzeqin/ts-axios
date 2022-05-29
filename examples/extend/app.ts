import axios from '../../src/index'
import type { AxiosError } from '../../src/index'

axios({
  url: '/extend/get',
  method: 'get',
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.error(err)
})

axios.get('/extend/get', {
  url: '/extend/get',
}).then(res => {
  console.log(res)
})

axios({
  url: '/extend/post',
  method: 'post',
}).then(res => {
  console.log(res)
})
axios.post('/extend/post', { name: '接口扩展' }, {
  url: '/extend/post',
}).then(res => {
  console.log(res)
})
// 接口重载
axios({
  url: '/extend/post',
  method: 'post',
  data: { name: '接口重载' }
}).then(res => {
  console.log(res)
})
axios('/extend/post', {
  method: 'post',
  data: { name: '接口重载' }
}).then(res => {
  console.log(res)
})

interface User {
  name: string
}
axios<User>('/extend/post', {
  method: 'post',
  data: { name: '接收泛型' }
}).then(res => {
  console.log(res.data.name)
})
