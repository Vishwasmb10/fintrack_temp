import { useEffect, useState, useContext } from 'react';
import style from '../stylesheets/App.module.css';
import Form from '../components/Form';
import Card from '../components/Card';
import Loader from '../components/Loader';
import sortTransactions from '../jsFiles/sortTransactions';
import { fetchDetails, updateNet, today } from '../jsFiles/dataFetchFunctions';
import Calendar from '../components/Calendar';
import logoutIconDark from "./assets/logoutdark.png";
import logoutIconLight from "./assets/logoutlight.png";
import ThemeToggle from '../components/ThemeToggle';
import calendarIcon from './assets/calendar.png';
import { useNavigate, useParams } from 'react-router-dom';
import Stats from '../components/Stats';
import statsIcon from './assets/statsIcon.png';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import BarGraph from './BarGraph';
import FloatingActionButtons from '../components/FloatingActionButtons';

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [cards, setCards] = useState([]);
  const [debitData, setDebitData] = useState([]);
  const [creditData, setCreditData] = useState([]);
  const [net, setNet] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(today);
  const [pickDate, setPickDate] = useState(false);
  const { page } = useParams();
  const { isDarkMode } = useContext(ThemeContext);
  const navigate=useNavigate();
  const [activeTab, setActiveTab] = useState('cards');

  function formDisplay() {
    setIsClicked((isClicked) => !isClicked);
    console.log(date);
  }

  function datePick() {
    setPickDate((pickDate) => !pickDate);
  }

  function handleLogout(){
    localStorage.removeItem("isAuth");
    // supabase.auth.signOut();
    navigate('/', { replace: true });

  }
    
  useEffect(() => {
    fetchDetails(setCreditData, setDebitData, setNet, date);
  }, []);

  useEffect(() => {
    fetchDetails(setCreditData, setDebitData, setNet, date);
  }, [date]);

  useEffect(() => {
    setTransactions(sortTransactions(creditData, debitData));
  }, [creditData, debitData]);

  useEffect(() => {
    setCards((prev) => {
      return transactions.map((ele, index) => {
        return (
          <Card 
            key={`${ele.transactionType} ${ele.id}`} 
            product={ele.product} 
            quantity={ele.quantity} 
            amount={ele.amount} 
            idAttribute={ele.id} 
            transactionType={ele.transactionType} 
            setCreditData={setCreditData} 
            setDebitData={setDebitData} 
            setNet={setNet} 
            date={date}
          />
        );
      });
    });
  }, [transactions]);

  // Helper to build dailyData for the current month
  const getDailyData = () => {
    const map = {};
    creditData.forEach((c) => {
      if (!c.date) return;
      if (!map[c.date]) map[c.date] = { date: c.date, credit: 0, debit: 0 };
      map[c.date].credit += Number(c.amount) || 0;
    });
    debitData.forEach((d) => {
      if (!d.date) return;
      if (!map[d.date]) map[d.date] = { date: d.date, credit: 0, debit: 0 };
      map[d.date].debit += Number(d.amount) || 0;
    });
    // Compute net as credit - debit for each date
    Object.values(map).forEach((entry) => {
      entry.net = (entry.credit || 0) - (entry.debit || 0);
    });
    return Object.values(map)
      .filter((entry) => entry.date)
      .sort((a, b) => (a.date && b.date ? a.date.localeCompare(b.date) : 0));
  };

  return (
    <div className={`${style.app} ${isDarkMode ? style.darkMode : ''}`}>
      {!page || page !== 'stats' ? (
        <>
          <ThemeToggle />
          <div className={style.header}>
            <h1 className={style.appTitle}>FinTrack</h1>
            {net.length > 0 ? (
              <p className={net[0].net > 0 ? style.netAmount : style.netAmountLoss}>
                Balance: {net[0].net}
              </p>
            ) : (
              <div className={style.netAmount}><Loader /></div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className={style.tabNav}>
            <button
              className={activeTab === 'cards' ? style.activeTab : ''}
              onClick={() => setActiveTab('cards')}
            >
              Cards
            </button>
            <button
              className={activeTab === 'graph' ? style.activeTab : ''}
              onClick={() => setActiveTab('graph')}
            >
              Graph
            </button>
          </div>

          {/* Tab Content */}
          <div className={style.tabContent}>
            {activeTab === 'cards' && (
              <div className={style.cardsContainer}>
                <h2 className={style.sectionTitle}>Transactions for {date}</h2>
                <div className={style.cards}>{cards}</div>
              </div>
            )}
            {activeTab === 'graph' && (
              <BarGraph dailyData={getDailyData()} />
            )}
          </div>

          {/* Floating Action Buttons rendered via Portal */}
          <FloatingActionButtons
            formDisplay={formDisplay}
            datePick={datePick}
            handleLogout={handleLogout}
            isDarkMode={isDarkMode}
            logoutIconDark={logoutIconDark}
            logoutIconLight={logoutIconLight}
            calendarIcon={calendarIcon}
            statsIcon={statsIcon}
          />

          {pickDate && (
            <div className={style.calendar}>
              <Calendar setDate={setDate} setPickDate={setPickDate} />
            </div>
          )}

          {isClicked && (
            <div className={style.formOverlay}>
              <Form 
                cards={cards} 
                setCards={setCards} 
                setIsClicked={setIsClicked} 
                setNet={setNet} 
                setCreditData={setCreditData} 
                setDebitData={setDebitData} 
                date={date}
              />
            </div>
          )}
        </>
      ) : (
        <Stats />
      )}
    </div>
  );
}

export default App;