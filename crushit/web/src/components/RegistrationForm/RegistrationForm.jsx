import { useAuth } from 'src/auth';
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameRequired, setUsernameRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false); // New state
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    // Reset previous messages
    setUsernameRequired(false);
    setPasswordRequired(false);
    setPasswordMatchError(false); // Reset password match error
    setRegistrationSuccess(false);
    setRegistrationError(null);

    // Check if email (username) and password are provided
    if (!email) {
      setUsernameRequired(true);
      return;
    }

    if (!password) {
      setPasswordRequired(true);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    // Check password requirements
    if (password.length < 12 || !containsTwoCharacterTypes(password)) {
      setRegistrationError('Password requirements not met.');
      return;
    }

    try {
      if (email && password && password === confirmPassword) {
        // Register with Firebase
        await signUp({ email, password })
        console.log('Firebase registration successful')
        const response = await fetch('/.redwood/functions/userRegistration', {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          console.log('User registration in Prisma successful')
          //navigate here
        } else {
          console.error('User registration in Prisma failed')
        }
      } else {
        console.error('Invalid form data')
      }
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };


    //break this code down into individual components, like button, text field, etc., adjust tailwind css to get as close
    //as possible to figma, and write unit tests for everything
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-3xl font-semibold mb-8 text-center">Sign Up</h1>

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
              onChange={e => setEmail(e.target.value)}
            />
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
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="button" className="bg-blue-600 text-white py-2 px-4 rounded w-full mb-6 hover:bg-blue-700 transition duration-150" onClick={handleSignUp}>
            Sign Up
          </button>

          <div className="w-80 mx-auto mt-10 border rounded p-4">
            <p className="text-center">
              Already have an account?
              <a href="#" className="text-blue-500 ml-1 hover:underline">Sign in Here!</a>
            </p>
          </div>
        </div>
      </div>
    );
}

