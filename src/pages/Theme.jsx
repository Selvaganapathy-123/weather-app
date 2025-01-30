// src/context/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ThemeContext = createContext();

// ThemeProvider component to wrap the app and provide theme state to children
export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  // Function to apply the theme styles to the body
  const applyTheme = (isDark) => {
    document.body.style.backgroundColor = isDark ? '#212529' : '#ffffff';
    document.body.style.color = isDark ? '#ffffff' : '#000000';
  };

  // Set the initial theme based on localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    setDarkTheme(isDark);
    applyTheme(isDark);

    // Listen for changes in localStorage across tabs
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem('theme');
      const isDark = newTheme === 'dark';
      setDarkTheme(isDark);
      applyTheme(isDark);
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Toggle the theme
  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
