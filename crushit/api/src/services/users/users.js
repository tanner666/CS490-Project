
import { db } from 'src/lib/db'
import { getAuth,deleteUser as deleteFirebaseUser, createUserWithEmailAndPassword } from 'firebase/auth';


export const users = () => {
  return db.user.findMany()
}

export const user = async ({ firebaseUid }) => {
  try{
    const userDB = await db.user.findUnique({
      where: { firebaseUid },
    })
    console.log(userDB)
    return userDB
  }catch(e){
    throw new Error(`User with Firebase UID ${firebaseUid} does not exist: ${e}`)
  }
  
}

/**
 * Creates a new user with the given input data.
 * @async
 * @function
 * @param {Object} input - The input data for creating a new user.
 * @param {string} input.email - The email of the user.
 * @param {string} input.firebaseUid - The Firebase UID of the user.
 * @returns {Promise<Object>} - A Promise that resolves with the created user object.
 * @throws {Error} - If there was an error creating the user.
 * @example
 * const input = { email: 'example@example.com', firebaseUid: '1234567890' };
 * const user = await createUser({ input });
 */
export const createUser = async ({ input }) => {
  console.log(input)
  const { email, firebaseUid } = input
  try{
    console.log(email)
    const userDB = await db.user.create({
      data: {
        email, firebaseUid, username: email, firstName: "", lastName: ""
      },
    })
    return userDB
  }catch(error){
    throw new Error(error.message)
  }
}

export const updateUser = ({ firebaseUid, input }) => {
  console.log(firebaseUid,input)
  return db.user.update({
    data: input,
    where: { firebaseUid },
  })
}

// Not completely functional yet, removes from firebase but not database;
export const deleteUser = async (input) => {
  const {firebaseUid} = input
  try{
    // console.log(firebase.auth().getUser(uid))
    // console.log(firebaseUid, auth)
    // await deleteFirebaseUser(autddh.currentUser);
    await db.user.delete({where:{firebaseUid:firebaseUid}})
    // console.log('User deleted from database')
    return { success: true, message:'User deleted successfully' }
  }catch(e){
    // console.log('Error deleting user:', e)
    return {success: false, message: 'Failed to delete user: '+e.message}
  }
}

export const User = {
  pomodoros: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).pomodoros()
  },
}


