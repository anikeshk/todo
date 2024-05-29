import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthProvider';

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { Authorization: 'Basic ' + btoa(`${username}:${password}`) },
      });
      const data = await response.json();
      if (data.status === 'success') {
        alert('Login successful');
        login(username, password);
      }
    } catch (error) {
      console.error(error);
    } finally {
      return navigate('/');
    }
  };
  return (
    <section>
      <form onSubmit={submitForm}>
        <div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
