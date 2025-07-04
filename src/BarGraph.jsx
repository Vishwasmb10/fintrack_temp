import React, { useState, useMemo, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const LABELS = {
  credit: 'Credit',
  debit: 'Debit',
  net: 'Net',
};

const BarGraph = ({ dailyData }) => {
  const [selected, setSelected] = useState(['credit', 'debit', 'net']);
  const [themeKey, setThemeKey] = useState(0);

  // Listen for theme changes (data-theme attribute and body.className)
  useEffect(() => {
    const updateTheme = () => setTimeout(() => setThemeKey((k) => k + 1), 50);
    const htmlObserver = new MutationObserver(updateTheme);
    const bodyObserver = new MutationObserver(updateTheme);
    htmlObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('storage', updateTheme);
    return () => {
      htmlObserver.disconnect();
      bodyObserver.disconnect();
      window.removeEventListener('storage', updateTheme);
    };
  }, []);

  // Robust theme detection
  const isLight = useMemo(() => {
    const themeAttr = document.documentElement.getAttribute('data-theme');
    if (themeAttr) return themeAttr === 'light';
    return window.matchMedia('(prefers-color-scheme: light)').matches;
  }, [themeKey]);

  // Dynamically resolve theme colors
  const themeColors = useMemo(() => ({
    credit: getCssVar('--credit-color') || '#28a745',
    debit: getCssVar('--debit-color') || '#dc3545',
    net: '#0d6efd', // Always blue for visibility
    text: isLight ? '#fff' : (getCssVar('--text-primary') || '#e6e6e6'),
    bg: isLight ? '#000' : (getCssVar('--glass-background') || '#181818'),
    grid: 'rgba(128,128,128,0.08)',
    tooltipBg: getCssVar('--bg-secondary') || '#222',
    tooltipBorder: getCssVar('--accent-color') || '#0d6efd',
    tooltipText: isLight ? '#fff' : (getCssVar('--text-primary') || '#e6e6e6'),
    btnInactive: getCssVar('--bg-secondary') || '#e9ecef',
  }), [isLight, themeKey]);

  const handleToggle = (type) => {
    setSelected((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const data = {
    labels: dailyData.map((d) => d.date),
    datasets: selected.map((type) => ({
      label: LABELS[type],
      data: dailyData.map((d) => d[type]),
      backgroundColor: themeColors[type],
      borderRadius: 6,
      maxBarThickness: 24,
      categoryPercentage: 0.6,
      barPercentage: 0.7,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: themeColors.text,
          font: { size: 13, weight: 'bold' },
        },
      },
      title: {
        display: true,
        text: 'Daily Transactions',
        color: themeColors.text,
        font: { size: 16, weight: 'bold' },
      },
      tooltip: {
        backgroundColor: themeColors.tooltipBg,
        titleColor: themeColors.tooltipText,
        bodyColor: themeColors.tooltipText,
        borderColor: themeColors.tooltipBorder,
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    layout: {
      padding: { top: 0, right: 8, bottom: 0, left: 8 },
    },
    scales: {
      x: {
        ticks: { color: themeColors.text, font: { size: 12 } },
        grid: { color: themeColors.grid },
      },
      y: {
        beginAtZero: false,
        ticks: { color: themeColors.text, font: { size: 12 } },
        grid: { color: themeColors.grid },
      },
    },
  };

  return (
    <div style={{
      background: isLight ? '#000' : themeColors.bg,
      borderRadius: 16,
      padding: 20,
      margin: '24px auto',
      boxShadow: 'var(--card-shadow)',
      maxWidth: 700,
      width: '100%',
      minWidth: 0,
      color: isLight ? '#fff' : themeColors.text,
    }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        {['credit', 'debit', 'net'].map((type) => (
          <button
            key={type}
            onClick={() => handleToggle(type)}
            style={{
              background: selected.includes(type) ? themeColors[type] : themeColors.btnInactive,
              color: selected.includes(type) ? '#fff' : (isLight ? '#fff' : themeColors.text),
              border: 'none',
              borderRadius: 8,
              padding: '7px 16px',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: selected.includes(type) ? '0 2px 8px rgba(0,0,0,0.10)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {LABELS[type]}
          </button>
        ))}
      </div>
      <div style={{ height: 260, width: '100%' }}>
        <Bar key={themeKey} data={data} options={options} />
      </div>
    </div>
  );
};

export default BarGraph; 