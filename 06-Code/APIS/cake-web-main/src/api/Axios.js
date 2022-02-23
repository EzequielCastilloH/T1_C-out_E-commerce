import axios from 'axios'

export default axios.create({
    baseURL: 'http://ec2-44-202-17-163.compute-1.amazonaws.com:3001/api/endpoints'
})
