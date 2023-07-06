import axios from 'axios'
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  withCredentials: true,
  headers: { Accept: 'application/json' }
})
