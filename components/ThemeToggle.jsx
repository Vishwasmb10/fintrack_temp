// components/ThemeToggle.jsx
import { useContext } from 'react';
import { ThemeContext } from '../src/ThemeContext';
import style from '../stylesheets/ThemeToggle.module.css';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme} 
      className={style.themeToggle}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className={style.iconContainer}>
        <span className={`${style.icon} ${isDarkMode ? style.sun : style.moon}`}>
          {isDarkMode ? '☀️' : '🌙'}
        </span>
      </div>
    </button>
  );
}

export default ThemeToggle;