import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const lightTheme = {
  background: '#f8fafc',
  text: '#1f2937',
  primary: '#16a34a',
  inputBg: '#fff',
  inputBorder: '#e5e7eb',
  placeholder: '#6b7280',
};

export const darkTheme = {
  background: '#1f2937',
  text: '#f8fafc',
  primary: '#16a34a',
  inputBg: '#374151',
  inputBorder: '#4b5563',
  placeholder: '#9ca3af',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
