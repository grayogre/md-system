import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://localhost:8001',
  withCredentials: true,
  headers: {
     'Accept': 'application/json',
  }
})

export default instance