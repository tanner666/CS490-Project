import { useAuth } from 'src/auth'
import React, { useState } from 'react'

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    try {
      await signUp({ email, password });
      // Redirect the user to another page after a successful sign-up.
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  return (
    //break this code down into individual components, like button, text field, etc., adjust tailwind css to get as close 
    //as possible to figma, and write unit tests for everything
  <div className="w-80 mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">{'RegistrationForm'}</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email/username
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="John Doe01"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
          Confirm Password
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-4" onClick={handleSignUp}>
        Sign Up
      </button>

      <p className="text-center">
        Already have an account? <a href="#" className="text-blue-500 hover:underline">Sign in Here!</a>
      </p>
    </div>
  );
}

export default RegistrationForm
