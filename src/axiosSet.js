import axios from 'axios'
import initialState from './store/initialState'
import { apiURL } from './config'

// const baseURL = 'http://localhost:3100'

axios.defaults.baseURL = apiURL

axios.defaults.headers.common['Authorization'] = 'bearer ' + initialState.token

axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})

axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  if (res.data.token) {
    axios.defaults.headers.common['Authorization'] = 'bearer ' + res.data.token
  }
  return res
})

export default axios