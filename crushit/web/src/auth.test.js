import { signUp, signIn, signOutUser, forgotPassword } from './auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(), 
  sendEmailVerification: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

describe('signUpWithEmailAndPassword', () => {
  const email = 'test@example.com';
  const password = 'password';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign up a user with valid credentials', async () => {
    const auth = getAuth();
    const userCredential = { user: { email } };
    createUserWithEmailAndPassword.mockResolvedValueOnce(userCredential);

    const result = await signUp(email, password);

    expect(result).toEqual(userCredential.user);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });

  it('should throw an error if user sign up fails', async () => {
    const auth = getAuth();
    const errorMessage = 'Failed to sign up user';
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error(errorMessage));

    await expect(signUp(email, password)).rejects.toThrow(errorMessage);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });
});

describe('signInWithEmailAndPassword', () => {
  const email = 'test@example.com';
  const password = 'password';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in a user with valid credentials', async () => {
    const auth = getAuth();
    console.log(auth);
    const userCredential = { user: { email } };
    signInWithEmailAndPassword.mockResolvedValueOnce(userCredential);

    const result = await signIn(email, password);

    expect(result).toEqual(userCredential.user);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });

  it('should throw an error if user sign in fails', async () => {
    const auth = getAuth();
    const errorMessage = 'Failed to sign in user';
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error(errorMessage));

    await expect(signIn(email, password)).rejects.toThrow(errorMessage);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });
});
describe('signOutUser', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should sign out the user', async () => {
      // Mock getAuth to return a mocked auth object
      const auth = getAuth();
      // Mock signOut method to resolve successfully
      signOut.mockResolvedValue(undefined);
  
      await signOutUser();
  
      expect(signOut).toHaveBeenCalled();
    });
  
    it('should throw an error if sign out fails', async () => {
      // Mock getAuth to return a mocked auth object
      const auth = getAuth();
      // Mock signOut method to reject with an error
      const errorMessage = 'Failed to sign out user';
      signOut.mockRejectedValue(new Error(errorMessage));
  
      await expect(signOutUser()).rejects.toThrow(errorMessage);
    });
  });  
  
  
  
  
  describe('forgotPassword', () => {
  const email = 'test@example.com';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send a password reset email with valid email', async () => {
    const auth = getAuth();
    await forgotPassword(email);

    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, email);
  });

  it('should throw an error if sending password reset email fails', async () => {
    const auth = getAuth();
    const errorMessage = 'Failed to send password reset email';
    sendPasswordResetEmail.mockRejectedValueOnce(new Error(errorMessage));

    await expect(forgotPassword(email)).rejects.toThrow(errorMessage);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, email);
  });
});