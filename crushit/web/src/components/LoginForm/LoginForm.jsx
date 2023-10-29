import { useAuth } from 'src/auth';
import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameRequired, setUsernameRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { signIn } = useAuth();

  const handleSignUp = async () => {
    // Reset previous messages
    setUsernameRequired(false);
    setPasswordRequired(false);
    setLoginSuccess(false);
    setLoginError(null);

    // Check if email (username) and password are provided
    if (!email) {
      setUsernameRequired(true);
      return;
    }

    if (!password) {
      setPasswordRequired(true);
      return;
    }

    // Check password requirements
    if (password.length < 12 || !containsTwoCharacterTypes(password)) {
      setLoginError('Password requirements not met.');
      return;
    }

    try {
      await signIn({ email, password });
      // Redirect the user to another page after a successful sign-up.
      setLoginSuccess(true);
    } catch (error) {
      console.error('Sign-in error:', error);
      setLoginError('Login failed. Please check your credentials.');
    }
  };

  // Function to check if the password contains characters from two different types
  const containsTwoCharacterTypes = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+[\]{};:'",.<>?/\\| -]/.test(password);

    const characterTypes = [hasUpper, hasLower, hasNumeric, hasSpecial];
    const typesCount = characterTypes.filter((type) => type).length;

    return typesCount >= 2;
  };

  return (
    <div className="min-h-screen flex justify-end">
      <div className="bg-black w-4/5 h-full flex items-center justify-center relative">
        <img
          src="https://drive.google.com/uc?id=16-VMhr8wY_qwKfeaHduWZTeB3oFuTc4b"
          alt="Your Image"
          className="max-w-32"
        />
        <div className="absolute top-0 left-0 w-full text-center text-white">
          <h2 className="text-3xl font-semibold mt-8">Crush It</h2>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-8 text-center">Sign In</h1>

        {loginSuccess && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            Login successful!
          </div>
        )}

        {loginError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {loginError}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email/username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="email"
            type="text"
            placeholder="John Doe01"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {usernameRequired && (
            <p className="text-red-500 text-sm mt-2">Username is required.</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordRequired && (
            <p className="text-red-500 text-sm mt-2">Password is required.</p>
          )}
        </div>

        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full mb-6 hover-bg-blue-700 transition duration-150"
          onClick={handleSignUp}
        >
          Sign In
        </button>

        <div className="w-80 mx-auto mt-10 border rounded p-4">
          <p className="text-center">
            <a href="#" className="text-blue-500 ml-1 hover:underline">
              Forgot Password
            </a>
          </p>
        </div>

        <div className="w-80 mx-auto mt-10 border rounded p-4">
          <p className="text-center">
            Need an account?{' '}
            <a href="/registration" className="text-blue-500 ml-1 hover:underline">
              Sign up Here!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
