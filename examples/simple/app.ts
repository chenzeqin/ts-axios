import axios from '../../src/index'

axios({
  url: '/simple/get?test=1##?sfsf#dd',
  method: 'get',
  params: {
    arr: ['a', 'b', 3],
    date: new Date(),
    object: { name: 'curry' },
    spacialCode:'&($%#%^#@)!!!   !!!!@#%%^&*()_+ '
  }
})
