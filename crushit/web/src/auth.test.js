import { signUp, signIn, signOutUser, forgotPassword } from './auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged, reauthenticateWithCredential, EmailAuthProvider,updatePassword, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(), 
  sendEmailVerification: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  EmailAuthProvider: jest.fn(),
  verifyPasswordResetCode: jest.fn(),
  confirmPasswordReset: jest.fn(),
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

import { resetUserPassword } from './auth';

describe('resetUserPassword', () => {
  const newPassword = 'newPassword';
  const oobCode = 'oobCode';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reset user password with valid oobCode and newPassword', async () => {
    const auth = getAuth();
    verifyPasswordResetCode.mockResolvedValueOnce(undefined);
    confirmPasswordReset.mockResolvedValueOnce(undefined);

    await resetUserPassword(newPassword, oobCode);

    expect(verifyPasswordResetCode).toHaveBeenCalledWith(auth, oobCode);
    expect(confirmPasswordReset).toHaveBeenCalledWith(auth, oobCode, newPassword);
  });
});