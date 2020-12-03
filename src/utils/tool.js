import { ACCESS_TOKEN } from '../store/mutation-types'

export const isProduction = /bhg\.htv2x\.com|gao\.com/.test(
  window.location.hostname
)
const prefix = isProduction ? 'aaa' : 'http://127.0.0.1:9000'

export const phonePattern = /^1(3|4|5|6|7|8|9)\d{9}$/

function getToken() {
  return localStorage.getItem(ACCESS_TOKEN)
}

export function handleLogout(ctx) {
  localStorage.clear()
  // const router = userRouter()
  // console.log(router)
  setTimeout(() => {
    ctx.$router.replace({ path: '/login' })
  }, 100)
}

export function fetchData(options = {}) {
  const { config = {} } = options
  const url = prefix + options.url
  if (!url) {
    return false
  }
  const headers = {}
  const { method = 'get' } = config
  if (!/\/(login|registry)$/.test(url)) {
    headers['Authorization'] = `Bearer ${getToken()}`
  }
  if (method === 'get') {
    headers['Content-Type'] = 'text/plain'
  } else {
    headers['Content-Type'] = 'application/json'
  }
  const payload = {
    ...config,
    headers: { ...config.headers, ...headers },
  }
  return fetch(url, payload)
    .then(async (res) => {
      // a non-200 response code
      if (!res.ok) {
        // create error instance with HTTP status text
        const error = new Error(res.statusText)
        error.json = res.json()
        throw error
      }
      const result = await res.json()
      return result
    })
    .catch((err) => {
      // In case a custom JSON error response was provided
      if (err.json) {
        return err.json.then((json) => {
          // set the JSON response message
        })
      }
    })
}
