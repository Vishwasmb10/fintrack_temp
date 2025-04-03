import { useEffect, useState } from 'react'
import style from '../stylesheets/App.module.css';
import Form from '../components/Form';
import {supabase} from './supabaseClient';
import Card from '../components/Card';
import Loader from '../components/Loader';

function App() {

  const [isClicked,setIsClicked]=useState(false);
  const [cards,setCards]=useState([]);
  const [data,setData]=useState([]);
  const [net,setNet]=useState([]);
  const date=new Date();

  function formDisplay(){
    setIsClicked((isClicked)=>!isClicked);
    console.log(net);
  }

  useEffect(()=>{
    async function fetchDetails(){
      const today=(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
      console.log(today);
      const {data,error}=await supabase.from('debit').select('*').eq('date',today);
      if(error){
        console.log("Error fetching the details: ",error);
      }
      else{
        setData(data);
        console.log("here:");
      }

      const {data:netAmount,error:netError}=await supabase.from('net').select('net');//.eq('date',today);
      if(netError){
        console.log("Error fetching the details: ",error);
      }
      else{
        setNet(netAmount);
      }
    }
    fetchDetails();
  },[]);

  useEffect(()=>{
    setCards((prev)=>{return data.map((ele,index)=>{return <Card key={ele.product} product={ele.product} quantity={ele.quantity} amount={ele.amount} idAttribute={index+1}/>});});
  },[data]);


  useEffect(()=>{
    async function updateNet(){ 
      const {data:netAmount,error:netError}=await supabase.from('net').select('net');//.eq('date',today);
        if(netError){
          console.log("Error fetching the details: ",error);
        }
        else{
          setNet(netAmount);
        }
      }
      updateNet();
  },[cards]);

  return (
    <div className={style.app}>
      {net.length>0?<p className={net[0].net>0?style.netAmount:style.netAmountLoss}>{net[0].net}</p>:<div className={style.netAmount}><Loader/></div>}
      <button type='button' className={style.addBtn} onClick={formDisplay}>+</button>
      {!isClicked?"":<div className={style.form}><Form cards={cards} setCards={setCards} setIsClicked={setIsClicked}/></div>}
      <div className={style.cards}>{cards}</div>
    </div>
  )
}

export default App
