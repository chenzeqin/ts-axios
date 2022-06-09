import axios, { AxiosError } from '../../src/index'


document.cookie = 'XSRF-TOKEN-test=1000'
// demo: withCredentials
// axios({
//   url: '/more/get',
//   method: 'get',
// }).then(res => {
//   console.log(res)
// }).catch((err: AxiosError) => {
//   console.log(err)
// })

// axios({
//   url: 'http://localhost:8088/more/server2',
//   method: 'post',
//   withCredentials: true // 自动携带sever2域下的cookie，但不能读取到
// }).then(res => {
//   console.log(res)
// }).catch((err: AxiosError) => {
//   console.log(err)
// })

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
