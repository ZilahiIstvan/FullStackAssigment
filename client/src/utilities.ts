export type ApiMethodType = 'POST' | 'PUT' | 'GET' | 'DELETE'

export const doFetch = async (
  url: string,
  method: ApiMethodType,
  data?: object
): Promise<Response> => {
  const baseUrl = import.meta.env.VITE_API_URL
  const token = localStorage.getItem('token')

  console.log('token: ', token)

  const resp = await fetch(`${baseUrl}/${url}`, {
    method: method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: data ? JSON.stringify(data) : undefined
  })

  return resp
}
