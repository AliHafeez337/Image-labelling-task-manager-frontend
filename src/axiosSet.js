import axios from 'axios'

const baseURL = 'http://localhost:3100'

axios.defaults.baseURL = baseURL

axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.getItem('token')

axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})

axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  // if (res.config.url === '/user/login') {
  //   axios.defaults.headers.common['x-auth'] = res.data.token
  // }
  return res
})

export default axios
