import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/register', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ username, password, name, email }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        alert('Registration successful');
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
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
