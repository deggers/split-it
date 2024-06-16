import React, { useState } from 'react';
import Cookies from 'js-cookie';

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = () => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      Cookies.set('loggedIn', 'true', { expires: 1 }); // 1 day expiration
      Cookies.set('username', username, { expires: 1 });
      onLogin(username);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold dark:text-white">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <input
            className="border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            className="border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;