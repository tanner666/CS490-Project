import { useAuth } from 'src/auth'
import React, { useState } from 'react'

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div>
      <h2>{'RegistrationForm'}</h2>
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
        <button type="button" onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
}

export default RegistrationForm
