import React, { useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { useAuth, signUp, signIn } from 'src/auth'
import { navigate } from '@redwoodjs/router'

const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      email
      firebaseUid
    }
  }`

const RegistrationForm = () => {
  const [createUser] = useMutation(CREATE_USER_MUTATION)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usernameRequired, setUsernameRequired] = useState(false)
  const [passwordRequired, setPasswordRequired] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatchError, setPasswordMatchError] = useState(false) // New state
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [registrationError, setRegistrationError] = useState(null)

  const handleSignUp = async () => {
    // Reset previous messages
    setUsernameRequired(false)
    setPasswordRequired(false)
    setPasswordMatchError(false) // Reset password match error
    setRegistrationSuccess(false)
    setRegistrationError(null)

    // Check if email (username) and password are provided
    if (!email) {
      setUsernameRequired(true)
      return
    }

    if (!password) {
      setPasswordRequired(true)
      return
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMatchError(true)
      return
    }

    // Check password requirements
    if (password.length < 12 || !containsTwoCharacterTypes(password)) {
      setRegistrationError('Password must be at least 12 characters long and contain characters from at least two different types (uppercase, lowercase, numeric, special).')
      return
    }

    if (passwordMatchError) {
      setRegistrationError('Password adsfjasdlfkjaslkdf not match.')
    }

    try {

      const userFB = (await signUp(email, password ))
      const firebaseUid = (await createUser( {variables:{input: { email, firebaseUid: userFB.uid }}} )).data.createUser.firebaseUid
      console.log('Firebase registration successful')
      // Redirect the user to another page after a successful sign-up.
      setRegistrationSuccess(true)
      // const response = await fetch('/.redwood/functions/userRegistration', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })
      // if (response.ok) {
      //   console.log('User registration in Prisma successful')
      // } else {
      //   console.error('User registration in Prisma failed')
      // }
      navigate('/')
    } catch (error) {
      console.error('Sign-up error:', error)
      setRegistrationError(
        'Registration failed. Please check your credentials.'
      )
    }

  }

  // Function to check if the password contains characters from two different types
  const containsTwoCharacterTypes = (password) => {
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumeric = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*()_+[\]{};:'",.<>?/\\| -]/.test(password)

    const characterTypes = [hasUpper, hasLower, hasNumeric, hasSpecial]
    const typesCount = characterTypes.filter((type) => type).length

    return typesCount >= 2
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setPasswordVisible(!passwordVisible);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
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
              <h1 className="text-3xl font-semibold mb-8 text-left">Sign Up</h1>

          {registrationSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
              Registration successful!
            </div>
          )}

          {registrationError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              {registrationError}
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
        type={passwordVisible ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
      />
      <img
        src="https://drive.google.com/uc?id=1Js4L7DAzkvl-TCPZ2GQi7R7z8TAI26_L"
        alt={passwordVisible ? 'Hide Password' : 'Show Password'}
        className="absolute top-2 right-2 cursor-pointer"
        style={{ width: '18px', height: '18px' }}
        onClick={() => togglePasswordVisibility('password')}
      />
    </div>
    {passwordRequired && (
      <p className="text-red-500 text-sm mt-2">Password is required.</p>
    )}
  </div>

  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirm-password">
      <span className="flex items-center">
        <img
          src="https://drive.google.com/uc?id=1pA2Xu-YP86YyJFPSJb4Q6LfOYcmEM1Gc"
          alt="Password Icon"
          className="mr-2"
          style={{ width: '18px', height: '18px' }}
        />
        Confirm Password
      </span>
    </label>
    <div className="relative">
      <input
        className="shadow appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        id="confirm-password"
        type={confirmPasswordVisible ? 'text' : 'password'}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
      />
      <img
        src="https://drive.google.com/uc?id=1Js4L7DAzkvl-TCPZ2GQi7R7z8TAI26_L"
        alt={confirmPasswordVisible ? 'Hide Password' : 'Show Password'}
        className="absolute top-2 right-2 cursor-pointer"
        style={{ width: '18px', height: '18px' }}
        onClick={() => togglePasswordVisibility('confirmPassword')}
      />
    </div>
    {passwordMatchError && (
      <p className="text-red-500 text-sm mt-2">Passwords do not match.</p>
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
              Sign Up
            </button>
          </div>
          <div className="flex items-center justify-center">            
            <div className="w-80 mx-auto absolute bottom-12 border rounded-lg p-3 bg-light-gray">
              <p className="text-center">
                Already have an account?{' '}
                <a href="/" className="text-blue-500 ml-1 hover:underline">
                  Sign in Here!
                </a>
              </p>
            </div>
          </div>  
        </div>
      </div>  
    </div>
  )
}

export default RegistrationForm
