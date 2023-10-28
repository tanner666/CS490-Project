/* eslint-disable prettier/prettier */
import React, { useState } from 'react'

import { PrismaClient } from '@prisma/client';

import { useAuth } from 'src/auth'

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp } = useAuth();
  const prisma = new PrismaClient();

  const handleSignUp = async () => {
    try {
      if (email && password && password === confirmPassword) {
        await signUp({ email, password }); //firebase

        const response = await fetch('/.redwood/functions/userRegistration', { //postgres
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {

          const data = await response.json();
          console.log(data);
        }
        console.log('Firebase registration successful');
        //navigate('/settings'); change to home later
      } else {
        console.error('Invalid form data');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
    } finally {
      prisma.$disconnect();
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

export default RegistrationForm
