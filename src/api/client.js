import axios from 'axios'

// Base URL is read from the environment so the same build can point at
// staging / production inference services without a code change.
const BASE_URL = "http://127.0.0.1:5000"

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
})

// Central place to attach auth headers, log errors, etc. once a backend exists.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error.message || 'Network error'
    return Promise.reject(new Error(message))
  }
)

export default apiClient
