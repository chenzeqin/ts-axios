import axios from '../../src/index'
// demo:处理url和params
axios({
  url: '/simple/get?test=1##?sfsf#dd',
  method: 'get',
  responseType:'json',
  params: {
    arr: ['a', 'b', 3],
    date: new Date(),
    object: { name: 'curry' },
    spacialCode: '&($%#%^#@)!!!   !!!!@#%%^&*()_+ '
  }
}).then(res => {
  console.log(res)
})
// demo: data为普通对象,不传headers
axios({
  url: '/simple/post',
  method: 'post',
  data: {
    name: '彭于晏'
  }
})
// demo: data为普通对象,传headers
axios({
  url: '/simple/post',
  method: 'post',
  data: {
    name: '吴彦祖',
    age: [12, 34]
  },
  headers: {
    'content-type': "application/json",
    "Accept": 'application/json,text/plain,*/*'
  }
})
// demo: data为 urlseachParams
const data = new URLSearchParams('name=urlseachParams&age=18&isMvp=true')
// 浏览器会自动加上Content-type: application/x-www-form-urlencoded;charset=UTF-8
axios({
  url: '/simple/post',
  method: 'post',
  data: data
})
// demo: data为Buffer
axios({
  url: '/simple/buffer?test=1##?sfsf#dd',
  method: 'post',
  data: new Int32Array([1, 2, 3, 4, 5])
})
