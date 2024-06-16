import React, { useState, useEffect } from 'react';

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 z-10">
      <div className="flex items-center">
        <h1 className="text-xl font-bold dark:text-white">React Table Project</h1>
        <span className="ml-4 dark:text-white">Logged in as: {username}</span>
      </div>
      <div className="flex items-center">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-blue-500 text-white rounded mr-2"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={onLogout}
          className="p-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;