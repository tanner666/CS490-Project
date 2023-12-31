import { useAuth } from 'src/auth';
import {signIn, forgotPassword} from 'src/auth';
import React, { useState, useEffect } from 'react';
import { navigate } from '@redwoodjs/router';
import { set } from '@redwoodjs/forms';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameRequired, setUsernameRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);
  // const { setUserUid } = useContext(UserContext);
  //const { signIn } = useAuth();

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
      setLoginError('Password must be at least 12 characters long and contain characters from at least two different types (uppercase, lowercase, numeric, special).');
      return;
    }

    try {
      const uid = await (await signIn( email, password)).uid
      console.log('User created successfully')
      // Redirect the user to another page after a successful sign-up.
      setLoginSuccess(true);
      // setUserUid(uid);
      navigate('/home');
    } catch (error) {
      console.error('Sign-in error:', error);
      setLoginError('Login failed. Please check your credentials');
    }
  };

  const handleForgotPassword = async () => {
    navigate('/forgot-password');
  }

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

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    // Toggle the password visibility state
    setPasswordVisible(!passwordVisible);
  };

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
              <h1 className="text-3xl font-semibold mb-8 text-left">Sign In</h1>

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
    	      <span className="flex items-center"> {/* Use a flex container to align items horizontally */}
                <img
                  src="https://drive.google.com/uc?id=1IU2B0OMrqnVAYx2tmcx4ffIJ__tvAgq1"
                  alt="Email Icon"
                  className="mr-2"
                  style={{ width: '18px', height: '18px' }} // You can adjust the width and height as needed
                  /> {/* Image */}
                Email/username
              </span>
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

           <div className="mb-6">
             <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
               <span className="flex items-center">
                 <img
                   src="https://drive.google.com/uc?id=1pA2Xu-YP86YyJFPSJb4Q6LfOYcmEM1Gc"
                   alt="Password Icon"
                   className="mr-2"
                   style={{ width: '18px', height: '18px' }}
                 />
               Password
               </span>
             </label>

	     <div className="relative">
               <input
          	className="shadow appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          	id="password"
          	type={passwordVisible ? 'text' : 'password'} // Use the passwordVisible state to toggle input type
          	value={password}
          	onChange={(e) => setPassword(e.target.value)}
		autoComplete="new-password" // Add this line to prevent the default password toggle button
              />
              <img
          	src="https://drive.google.com/uc?id=1Js4L7DAzkvl-TCPZ2GQi7R7z8TAI26_L"
          	alt={passwordVisible ? "Hide Password" : "Show Password"}
          	className="absolute top-2 right-2 cursor-pointer"
          	style={{ width: '18px', height: '18px' }}
          	onClick={togglePasswordVisibility}
              />
      	    </div>
            {passwordRequired && (
              <p className="text-red-500 text-sm mt-2">Password is required.</p>
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
              onClick={handleSignUp}
            >
              Sign In
            </button>
          </div>


          <div className="w-80 mx-auto mt-10 border rounded-lg p-3">
            <p className="text-center">
              <a href="#" className="text-blue-500 ml-1 hover:underline" onClick={handleForgotPassword}>
                Forgot Password
              </a>
            </p>
          </div>
        <div className="flex items-center justify-center">
          <div className="w-80 mx-auto absolute bottom-12 border rounded-lg p-3 bg-light-gray">
            <p className="text-center">
              Need an account?{' '}
              <a href="/registration" className="text-blue-500 ml-1 hover:underline">
                Sign up Here!
              </a>
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
