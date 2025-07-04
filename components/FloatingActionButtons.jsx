import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import style from '../stylesheets/App.module.css';

const FloatingActionButtons = ({
  formDisplay,
  datePick,
  handleLogout,
  isDarkMode,
  logoutIconDark,
  logoutIconLight,
  calendarIcon,
  statsIcon
}) => {
  return ReactDOM.createPortal(
    <div className={style.actionButtons}>
      <button type='button' className={style.addBtn} onClick={formDisplay}>
        +
      </button>
      <button className={style.iconBtn} onClick={datePick}>
        <img src={calendarIcon} alt="calendar" />
      </button>
      <Link to="/app/stats">
        <button className={style.iconBtn}>
          <img src={statsIcon} alt="statsIcon" />
        </button>
      </Link>
      <button type="button" className={style.logoutBtn} onClick={handleLogout}>
        <img src={isDarkMode?logoutIconDark:logoutIconLight} alt="logout" />
      </button>
    </div>,
    document.body
  );
};

export default FloatingActionButtons; 