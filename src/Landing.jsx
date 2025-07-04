import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import styles from '../stylesheets/Landing.module.css';

const Landing = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const features = [
    {
      id: 1,
      title: "Transaction Addition",
      description: "Easily add new income and expense transactions with detailed categorization and notes.",
      icon: "➕",
      color: "var(--credit-color)"
    },
    {
      id: 2,
      title: "Transaction Deletion",
      description: "Remove unwanted transactions with a simple click. Keep your financial records clean and organized.",
      icon: "🗑️",
      color: "var(--debit-color)"
    },
    {
      id: 3,
      title: "Transaction Edit",
      description: "Modify existing transactions anytime. Update amounts, categories, or notes with ease.",
      icon: "✏️",
      color: "var(--accent-color)"
    },
    {
      id: 4,
      title: "Graphical Visualization",
      description: "View your financial summary through beautiful charts and graphs for better insights.",
      icon: "📊",
      color: "var(--credit-color)"
    },
    {
      id: 5,
      title: "Dark/Light Theme",
      description: "Switch between dark and light themes for comfortable viewing in any environment.",
      icon: isDarkMode ? "☀️" : "🌙",
      color: "var(--accent-color)"
    }
  ];

  return (
    <div className={styles.landing}>
      {/* Grid Background */}
      <div className={styles.gridBackground}>
        <div className={styles.gridLines}></div>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1 className={styles.appName}>FinTrack</h1>
          <p className={styles.tagline}>Smart Financial Management</p>
        </div>
        <div className={styles.headerActions}>
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>
            Take Control of Your Finances
          </h2>
          <p className={styles.heroDescription}>
            Track your income, expenses, and savings with our intuitive financial management app. 
            Get insights into your spending patterns and achieve your financial goals.
          </p>
          <Link to="/login" className={styles.ctaButton}>
            Start Tracking Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h3 className={styles.featuresTitle}>Key Features</h3>
        <div className={styles.featuresGrid}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.featureCard}>
              <div 
                className={styles.featureIcon}
                style={{ backgroundColor: feature.color + '20' }}
              >
                <span style={{ fontSize: '2rem' }}>{feature.icon}</span>
              </div>
              <h4 className={styles.featureTitle}>{feature.title}</h4>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 FinTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing; 