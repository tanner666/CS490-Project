/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import { useAuth } from 'src/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn({ email, password });
      // Redirect the user to another page after a successful sign-in.
      navigate('/settings'); // change to home later
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleSignIn}>Sign In</button>
      </form>
    </div>
  );
};

export default LoginForm;
