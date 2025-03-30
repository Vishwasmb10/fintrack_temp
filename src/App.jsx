import { useEffect, useState } from 'react'
import style from '../stylesheets/App.module.css';
import Form from '../components/Form';
import {supabase} from './supabaseClient';
import Card from '../components/Card';

function App() {

  const [isClicked,setIsClicked]=useState(false);
  const [cards,setCards]=useState([]);
  const [data,setData]=useState([]);

  function formDisplay(){
    setIsClicked((isClicked)=>!isClicked);
  }

  useEffect(()=>{
    async function fetchDetails(){
      const {data,error}=await supabase.from('debit').select('*');
      if(error){
        console.log("Error fetching the details: ",error);
      }
      else{
        setData(data);
        console.log("here");
      }
    }
    fetchDetails();
  },[]);

  useEffect(()=>{
    setCards((prev)=>{return data.map((ele)=>{return <Card key={ele.product} product={ele.product} quantity={ele.quantity} amount={ele.amount} />});});
  },[data]);


  return (
    <div className={style.app}>
      <button type='button' className={style.addBtn} onClick={formDisplay}>+</button>
      {!isClicked?"":<div className={style.form}><Form cards={cards} setCards={setCards}/></div>}
      <div className={style.cards}>{cards}</div>
    </div>
  )
}

export default App
