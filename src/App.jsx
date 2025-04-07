import { useEffect, useState } from 'react'
import style from '../stylesheets/App.module.css';
import Form from '../components/Form';
import {supabase} from './supabaseClient';
import Card from '../components/Card';
import Loader from '../components/Loader';
import sortTransactions from '../jsFiles/sortTransactions';

function App() {

  const [isClicked,setIsClicked]=useState(false);
  const [cards,setCards]=useState([]);
  const [debitData,setDebitData]=useState([]);
  const [creditData,setCreditData]=useState([]);
  const [net,setNet]=useState([]);
  const [transactions,setTransactions]=useState([]);

  const date=new Date();
  const today=(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
  

  function formDisplay(){
    setIsClicked((isClicked)=>!isClicked);
    // console.log(net);
  }

  async function updateNet(){ 
    const {data:netAmount,error:netError}=await supabase.from('net').select('net').eq('date',today);
      if(netError){
        console.log("Error fetching the details: ",error);
      }
      else{
        setNet(netAmount);
      }
    }

  async function fetchCreditValues(){
    const {data:creditData,error:creditError}=await supabase.from('credit').select('*').eq('date',today);
    if(creditError){
      console.log("Error fetching the details: ",creditError);
    }
    else{
      setCreditData(creditData);
      // console.log(creditData);
      // console.log("here:" + new Date().getMinutes());
      // console.log(new Date(creditData[0].time).getDate());
    }
  }

    
  async function fetchDebitValues(){
    const {data:debitData,error:debitError}=await supabase.from('debit').select('*').eq('date',today);
    if(debitError){
      console.log("Error fetching the details: ",debitError);
    }
    else{
      setDebitData(debitData);
      // console.log(debitData);
      // console.log("here:");
    }
  }



  useEffect(()=>{
    async function fetchDetails(){
      console.log(today);

      fetchCreditValues();
      fetchDebitValues();
      updateNet();

    }
    fetchDetails();
  },[]);

  useEffect(()=>{
      setTransactions(sortTransactions(creditData,debitData));
  },[creditData,debitData]);


  useEffect(()=>{
    setCards((prev)=>{return transactions.map((ele,index)=>{return <Card key={`${ele.transactionType} ${ele.id}`} product={ele.product} quantity={ele.quantity} amount={ele.amount} idAttribute={ele.id} transactionType={ele.transactionType} setCreditData={setCreditData} setDebitData={setDebitData} setNet={setNet}/>});}); //setData={setData} setNet={setNet}
  },[transactions]);




  useEffect(()=>{
      updateNet();
  },[cards]);

  return (
    <div className={style.app}>
      {net.length>0?<p className={net[0].net>0?style.netAmount:style.netAmountLoss}>{net[0].net}</p>:<div className={style.netAmount}><Loader/></div>}
      <button type='button' className={style.addBtn} onClick={formDisplay}>+</button>
      {!isClicked?"":<div className={style.form}><Form cards={cards} setCards={setCards} setIsClicked={setIsClicked} setNet={setNet} setCreditData={setCreditData} setDebitData={setDebitData}/></div>}
      <div className={style.cards}>{cards}</div>
    </div>
  )
}

export default App
