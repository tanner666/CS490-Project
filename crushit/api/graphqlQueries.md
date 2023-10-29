## creating a user in the database from client side

add this code in the component that is going to create a new user
```js
const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      email
      firebaseUid
    }
  }`
```
in the component create a hook like so
```js
  const [createUser] = useMutation(CREATE_USER_MUTATION)
```
when handling signup after creating user through firebase create the user in the DB using the createUser hook
```js
await createUser( {variables:{input: { email, firebaseUid: userFB.uid }}} )
```
