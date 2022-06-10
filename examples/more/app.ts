import axios, { AxiosError } from '../../src/index'
import qs from 'qs'

document.cookie = 'XSRF-TOKEN-test=1000'
// demo: withCredentials
axios({
  url: '/more/get',
  method: 'get',
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err)
})

axios({
  url: 'http://localhost:8088/more/server2',
  method: 'post',
  withCredentials: true // 自动携带sever2域下的cookie，但不能读取到
}).then(res => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err)
})

/* demo: xsrf */
// 本域名请求，可以把cookie的token获取，放进header中
axios.get('/more/get', {
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
}).then(res => {
  console.log(res)
})

// 手动在server2下执行 document.cookie = 'XSRF-TOKEN-F=test123'
// server1 向 server2发送请求，即使cookie名称对应上，也不能手动添加token到header中
axios({
  method: 'post',
  url: 'http://localhost:8088/more/server2',
  xsrfCookieName: 'XSRF-TOKEN-F', // server2 cookie名称
  xsrfHeaderName: 'X-XSRF-TOKEN-F', // server2 token名称
  withCredentials: true
}).then(res => {
  console.log(res)
})


/* auth */
axios({
  method: 'post',
  url: '/more/auth',
  auth: {
    username: "admin",
    password: '123'
  },
  data: {
    isLogin: true
  }
}).then(res => {
  console.log(res)
})

// validate status
axios.get('/more/304').then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})

axios.get('/more/304', {
  validateStatus(status) {
    return 200 <= status && status < 400
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})
//  params 序列化  -  1
axios.get('/more/params', {
  params: new URLSearchParams('a=1&b=2')
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})
//  params 序列化  -  2 默认规则（自己实现），特殊字符保持不变
axios.get('/more/params', {
  params: { c: 3, d: [4, 4, 4, 4] }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})
//  params 序列化  -  3 特殊字符会encode
axios.get('/more/params', {
  params: {
    e: [5, 5, 5, 5],
    f: 5
  },
  paramsSerializer(data) {
    return qs.stringify(data)
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})
