// components/ThemeToggle.jsx
import { useContext } from 'react';
import { ThemeContext } from '../src/ThemeContext';
import style from '../stylesheets/ThemeToggle.module.css';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className={style.toggleContainer}>
      <button 
        onClick={toggleTheme} 
        className={style.themeToggle}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

export default ThemeToggle;