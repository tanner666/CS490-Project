import { useEffect } from 'react'

export const QUERY = gql`
  query get_auth_url {
    getAuthorizationURL {
      url
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => {
  console.log("ERROR FAIL",error);
  return <div style={{ color: 'red' }}>Error: {error?.message}</div>;
};


export const Success = ({ getAuthorizationURL }) => {
  useEffect(() => {
    window.location.href = getAuthorizationURL.url
  }, [getAuthorizationURL.url]);
  localStorage.setItem('isAuthenticated', 'true');


  return <div></div>
}