import { useState,useEffect } from "react";
import style from '../stylesheets/Calendar.module.css'
function Calendar(props){

    const [week,setWeek]=useState([]);
    const [datesList,setDatesList]=useState([]);
    
    function getLast7DaysFormatted(endDate = new Date()) {
        const dates = [];

        for (let i = 6; i >= 0; i--) {
          const day = new Date(endDate);
          day.setDate(endDate.getDate() - i);
      
          const year = day.getFullYear();
          const month = day.getMonth() + 1; // No padStart
          const date = day.getDate();       // No padStart
      
          dates.push(`${year}-${month}-${date}`);
        }
      
        setWeek(dates);
        return dates;
      }
      

      function selectDate(date){
        console.log("HERE:" + date);
        props.setDate(date);
        setTimeout(()=>{props.setPickDate((pickDate)=>!pickDate);},300);
        
      }
      useEffect(()=>{getLast7DaysFormatted();},[]);

      useEffect(()=>{setDatesList((prev)=>{return week.map((ele)=>{return <li key={ele} onClick={()=>{selectDate(ele)}}>{ele}</li>})});},[week]);
      
    return(
        <div className={style.calendarContainer}>
            <ul>
            <p>Pick a Day</p>
            {datesList}
            </ul>
        </div>
    ); 
}

export default Calendar;