import React, { useMemo, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const LABELS = {
  credit: 'Credit',
  debit: 'Debit',
  net: 'Net',
};

const LineGraph = ({ dailyData }) => {
  const [themeKey, setThemeKey] = useState(0);

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

  const isLight = useMemo(() => {
    const themeAttr = document.documentElement.getAttribute('data-theme');
    if (themeAttr) return themeAttr === 'light';
    return window.matchMedia('(prefers-color-scheme: light)').matches;
  }, [themeKey]);

  const themeColors = useMemo(() => ({
    credit: getCssVar('--credit-color') || '#28a745',
    debit: getCssVar('--debit-color') || '#dc3545',
    net: '#0d6efd',
    text: isLight ? '#212529' : (getCssVar('--text-primary') || '#e6e6e6'),
    bg: isLight ? '#fff' : (getCssVar('--glass-background') || '#181818'),
    grid: 'rgba(128,128,128,0.12)',
    tooltipBg: getCssVar('--bg-secondary') || '#222',
    tooltipBorder: getCssVar('--accent-color') || '#0d6efd',
    tooltipText: isLight ? '#212529' : (getCssVar('--text-primary') || '#e6e6e6'),
  }), [isLight, themeKey]);

  const data = {
    labels: dailyData.map((d) => d.date),
    datasets: [
      {
        label: LABELS.credit,
        data: dailyData.map((d) => d.credit),
        borderColor: themeColors.credit,
        backgroundColor: themeColors.credit,
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: LABELS.debit,
        data: dailyData.map((d) => d.debit),
        borderColor: themeColors.debit,
        backgroundColor: themeColors.debit,
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: LABELS.net,
        data: dailyData.map((d) => d.net),
        borderColor: themeColors.net,
        backgroundColor: themeColors.net,
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
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
        text: 'Daily Trends',
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
      background: themeColors.bg,
      borderRadius: 16,
      padding: 20,
      margin: '16px auto 0 auto',
      boxShadow: 'var(--card-shadow)',
      width: '100%',
      minWidth: 0,
      color: themeColors.text,
      height: 260,
      maxWidth: 700,
    }}>
      <Line key={themeKey} data={data} options={options} />
    </div>
  );
};

export default LineGraph; 