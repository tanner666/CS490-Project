import { fetch } from 'cross-undici-fetch'

export const getAuthorizationURL = async () => {
  const authURL = process.env.REACT_APP_AUTH_URL;
  const response = await fetch(authURL);
  const json = await response.json();
  return {
    url: json.data,
  };
}
