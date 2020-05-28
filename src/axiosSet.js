import axios from 'axios'

export default axios.create({
    baseURL:'http://localhost:3100',
    // ,
    // You can add your headers here
    // headers: {
    //   'x-auth': Store.getters.getToken
    // }
})