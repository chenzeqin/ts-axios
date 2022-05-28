import axios from '../../src/index'

axios({
  url: '/error/random',
  method: 'get',
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err.message)
})

axios({
  url: '/error/timeout',
  method: 'get',
  timeout: 3000
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err.message)
})
