import axios from '../../src/index'
import type { AxiosError, AxiosTransformer } from '../../src/types/index'
import qs from 'qs'

axios.default.timeout = 2000
axios.default.headers.common.test1 = 111
axios.default.headers.post.test2 = 2222

axios({
  url: '/config/post',
  method: 'post',
  headers: {
    test3: '3333',
  },
  data: qs.stringify({
    name: '123'
  }),
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err)
})



axios({
  url: '/config/post',
  method: 'post',
  headers: {
    test3: '3333',
  },
  data: {
    name: 'transform'
  },
  transformRequest: [
    function (data, headers) {
      return qs.stringify(data)
    },
    ...(axios.default.transformRequest as AxiosTransformer[]),
  ],
  transformResponse: [
    ...(axios.default.transformResponse as AxiosTransformer[]),
    function (data, headers) {
      if (typeof data === 'object') {
        data.newProp = 'test-transform-data'
      }
      return data
    }
  ]
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err)
})

// 通过扩展静态接口create，创建一个新的实例
const request = axios.create({
  headers: {
    test: 'test',
  },
  transformRequest: [
    function (data, headers) {
      return qs.stringify(data)
    },
    ...(axios.default.transformRequest as AxiosTransformer[]),
  ],
  transformResponse: [
    ...(axios.default.transformResponse as AxiosTransformer[]),
    function (data, headers) {
      if (typeof data === 'object') {
        data.newProp = 'test-static-interface'
      }
      return data
    }
  ]
})

request.post('/config/post', { name: 'curry' }).then(res => {
  console.log(res)
})
