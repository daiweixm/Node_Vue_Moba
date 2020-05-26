import axios from 'axios'
import Vue from 'vue'
import router from './router/index'
const http = axios.create({
  baseURL: 'http://127.0.0.1:3000/admin/api'
})

http.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization ='Bearer ' + (localStorage.getItem('token') || '')
  }
  
  return config
}, error => {
  return Promise.reject(error)
})

http.interceptors.response.use(res => {
  return res
},err => {
  if (err.response.data.msg) {
    Vue.prototype.$message({
      message: err.response.data.msg,
      type: 'error'
    })
    if (err.response.status === 401) {
      // Vue.prototype.$router.push('/login')
      // console.log(router)
      router.push('/login')
    }
  }
  return Promise.reject(err)
})
export default http