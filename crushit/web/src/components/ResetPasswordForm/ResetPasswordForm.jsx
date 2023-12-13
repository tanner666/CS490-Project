import React, { useEffect, useState } from 'react';
import { resetUserPassword } from 'src/auth'; // Assuming the resetPassword function exists in your auth module
import { navigate } from '@redwoodjs/router';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const oobCode = new URLSearchParams(location.search).get('oobCode');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    console.log('oobCode',oobCode);
    if (!oobCode || oobCode=='code') {
      navigate('/forgot-password');
    }
  }, [oobCode]);

  const containsTwoCharacterTypes = (password) => {
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumeric = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*()_+[\]{};:'",.<>?/\\| -]/.test(password)

    const characterTypes = [hasUpper, hasLower, hasNumeric, hasSpecial]
    const typesCount = characterTypes.filter((type) => type).length

    return typesCount >= 2
  }

  const handleResetPassword = async () => {
    try {

      // Check if passwords match
      if (password !== confirmPassword) {
        setResetError('Passwords do not match');
        return;
      }
      if (password.length < 12 || !containsTwoCharacterTypes(password)) {
        setResetError('Password does not meet requirements');
        return;
      }
      // Call the resetPassword function passing the new password
      await resetUserPassword(password, oobCode);
      // await auth().confirmPasswordReset(oobCode, password);
      setResetSuccess(true);
      setTimeout(() => {
        navigate('/'); // Navigate to a success page or any other route after reset
      }, 2000);
    } catch (error) {
      console.error(error);
      setResetError('Error resetting password');
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
          <h1 className="text-3xl font-semibold mb-8 text-left">Reset Password?</h1>

          {resetSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
              Reset success!<br/>Sending to sign in page
            </div>
          )}

          {resetError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              {resetError}
            </div>
          )}

          <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="newPassword">
          New Password
        </label>
        <div className="relative">
          <input
            className="shadow appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="newPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
              <img
          	src="https://drive.google.com/uc?id=1Js4L7DAzkvl-TCPZ2GQi7R7z8TAI26_L"
          	alt={showPassword ? "Hide Password" : "Show Password"}
          	className="absolute top-2 right-2 cursor-pointer"
          	style={{ width: '18px', height: '18px' }}
          	onClick={setShowPassword}
              />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmNewPassword">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            className="shadow appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="confirmNewPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
              <img
          	src="https://drive.google.com/uc?id=1Js4L7DAzkvl-TCPZ2GQi7R7z8TAI26_L"
          	alt={showConfirmPassword ? "Hide Password" : "Show Password"}
          	className="absolute top-2 right-2 cursor-pointer"
          	style={{ width: '18px', height: '18px' }}
          	onClick={setConfirmPassword}
              />
        </div>
      </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              className="text-white w-[40%] py-3 rounded-lg mb-6 transition duration-150"
              style={{
                background: 'linear-gradient(180deg, #6284FF 0%, #4B6DE9 100%)',
                boxShadow: '0px 4px 80px 0px rgba(98, 132, 255, 0.20)'
              }}
              onClick={handleResetPassword}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
