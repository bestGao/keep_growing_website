export const isProduction = /bhg\.htv2x\.com|gao\.com/.test(
  window.location.hostname
)
const prefix = isProduction ? 'aaa' : 'http://127.0.0.1:9000'

export function fetchData(options = {}) {
  const { config = {} } = options
  const url = prefix + options.url
  if (!url) {
    return false
  }
  const headers = {}
  const { method = 'get' } = config
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
