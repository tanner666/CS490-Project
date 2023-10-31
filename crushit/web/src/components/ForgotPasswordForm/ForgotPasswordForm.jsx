import {signIn, forgotPassword} from 'src/auth';
import React, { useState, useEffect } from 'react';
import { navigate } from '@redwoodjs/router';
import { set } from '@redwoodjs/forms';

const ForgotPasswordForm = () => {
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState(null);
  const [email, setEmail] = useState('');
  const [usernameRequired, setUsernameRequired] = useState(false);

  const handleForgotPassword = async () => {  
    try{
      await forgotPassword(email);
      setForgotSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000); // 2000 milliseconds = 2 seconds
    }catch(e){
      console.log(e)
      setForgotError('Error sending password reset email');
    }
  }

  return (
    <div className="bg-light-gray min-h-screen flex">
      <div className="bg-custom-gray flex-grow h-screen flex items-center justify-center relative rounded-r-lg" 
      style={{ flex: '1', maxWidth: '59vw' }}>
          <div className="flex flex-col justify-between items-center w-full">
              <div className="text-center text-white mt-[10%]">
                  <h2 className="font-normal leading-none font-fredoka" style={{ fontSize: '4vw' }}>Crush It</h2>
              </div>
              <img
                  src="https://drive.google.com/uc?id=16-VMhr8wY_qwKfeaHduWZTeB3oFuTc4b"
                  alt="Your Image"
                  className="w-[63.76%] mt-[10%]"
              />
          </div>
      </div>
      <div className="flex items-center justify-center ml-[-50px]">
          <div className="relative bg-white p-8 rounded-lg shadow-lg h-[90%] w-[500px]">
              <h1 className="text-3xl font-semibold mb-8 text-left">Forgot Password?</h1>

          {forgotSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
              Link Sent!<br/>Sending to sign in page
            </div>
          )}

          {forgotError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              {forgotError}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email/username
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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

          <div className="flex items-center justify-center">
            <button
              type="button"
              className="text-white w-[40%] py-3 rounded-lg mb-6 transition duration-150"
              style={{
                background: 'linear-gradient(180deg, #6284FF 0%, #4B6DE9 100%)',
                boxShadow: '0px 4px 80px 0px rgba(98, 132, 255, 0.20)'
              }}
              onClick={handleForgotPassword}
            >
              Send Link
            </button>
          </div>

          <div className="flex items-center justify-center flex-col h-full">
  <div className="w-80 mx-auto border rounded-lg p-3 bg-light-gray mb-2">
    <p className="text-center">
      Need an account?{' '}
      <a href="/registration" className="text-blue-500 ml-1 hover:underline">
        Sign up Here!
      </a>
    </p>
  </div>
  <div className="w-80 mx-auto border rounded-lg p-3 bg-light-gray">
    <p className="text-center">
      Already have an account?{' '}
      <a href="/registration" className="text-blue-500 ml-1 hover:underline">
        Sign in Here!
      </a>
    </p>
  </div>
</div>


        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm
