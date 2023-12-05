import { fetch } from 'cross-undici-fetch'

export const getAuthorizationURL = async () => {
  const response = await fetch(`http://localhost:8911/createAuth`)
  const json = await response.json()
  return {
    url: json.data,
  }
}