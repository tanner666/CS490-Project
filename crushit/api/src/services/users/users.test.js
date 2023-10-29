import { standard } from './users.scenarios'
import {createUser, deleteUser, users, user,} from './users'
import * as firebaseAuth from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, deleteUser as dUser ,signInWithEmailAndPassword} from 'firebase/auth';


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
}
const firebaseApp = initializeApp(firebaseConfig)
const auth = firebaseAuth.getAuth(firebaseApp);

let email = standard.user.one.email;
let password = standard.user.one.password;

describe('createUser', () => {
  it('Creates a user', async () => {
    const input = {email, password}
    const context = {firebaseApp}
    const createdUser = await (await createUser({input, context})).userDB

    // console.log(createdUser)
    expect(createdUser).toBeDefined();
    expect(createdUser.email).toBe(email)
    // console.log(createdUser.firebaseUid)
    // console.log('test', auth)
    let temp = {firebaseUid: createdUser.firebaseUid, auth}
    await deleteUser(temp).then((res)=>{console.log(res)})
  })

  it('Creating user that already exists', async () =>{
    const input = {email, password}
    const context = {firebaseApp}
    const mainUser = (await createUserWithEmailAndPassword(auth, email, password)).user

    const createdUser = await (await createUser({input, context}))

    expect(createdUser.success).toBe(false)
    await deleteUser({firebaseUid: mainUser.uid, auth})
  })
})

// describe('deleteUser', () => {
//   it('deletes a user', async () => {
//     await createUserWithEmailAndPassword(auth, email, password) 
//     let user = (await signInWithEmailAndPassword(auth,email,password)).user
//     const deletedUser = await deleteUser({ firebaseUid: user.uid, auth })

//     expect(deletedUser).toBeDefined()
//     expect(deletedUser.success).toBe(true)

//   })
// })

describe('users', () => {
  it('get list of users after creating a user', async()=>{
    const input = {email, password}
    const context = {firebaseApp}
    const createdUser = await (await createUser({input, context})).userDB
    
    await users().then((users)=>{

      console.log('users', users)
      expect(users).toBeDefined()
      expect(users.length).toBeGreaterThan(0)

      

    })
    await deleteUser({firebaseUid: createdUser.firebaseUid, auth})
  })
})
