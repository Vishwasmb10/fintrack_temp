import { useState, useEffect } from 'react'
import { supabase } from '../src/supabaseClient';
import styles from '../stylesheets/login.module.css'
import {useNavigate} from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', isError: false })
  const [theme, setTheme] = useState('light');
  const navigate=useNavigate();


  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', isError: false })
   
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {console.log(error);throw error}
      
      setMessage({ text: 'Logged in successfully! Redirecting...', isError: false })
      localStorage.setItem('isAuth',"true");
      
        // console.log('Navigating—isAuth =', localStorage.getItem('isAuth'))
        navigate('/', { replace: true })

      
    } catch (error) {
      setMessage({ text: error.message, isError: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          {/* Theme Toggle Button - Now inside the formWrapper */}
          <button 
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              // Moon icon for light mode (click to switch to dark)
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path>
              </svg>
            ) : (
              // Sun icon for dark mode (click to switch to light)
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            )}
          </button>
          
          <h1 className={styles.title}>Tea Master</h1>
         
          <form className={styles.form} onSubmit={handleAuth}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
           
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            {message.text && (
              <div className={`${styles.message} ${message.isError ? styles.error : styles.success}`}>
                {message.text}
              </div>
            )}
           
            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}