import { supabase } from "../src/supabaseClient";
const day=new Date();
const today=(`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`);

async function updateNet(setNet,date){ 
    const {data:netAmount,error:netError}=await supabase.from('net').select('net').eq('date',date);
      if(netError){
        console.log("Error fetching the details: ",netError);
      }
      else{
        setNet(netAmount);
      }
}


async function fetchCreditValues(setCreditData,date){
    const {data:creditData,error:creditError}=await supabase.from('credit').select('*').eq('date',date);
    if(creditError){
      console.log("Error fetching the details: ",creditError);
    }
    else{
      setCreditData(creditData);
    }
}

async function fetchDebitValues(setDebitData,date){
    const {data:debitData,error:debitError}=await supabase.from('debit').select('*').eq('date',date);
    if(debitError){
      console.log("Error fetching the details: ",debitError);
    }
    else{
      setDebitData(debitData);
    }
}

async function fetchDetails(setCreditData,setDebitData,setNet,date){
    console.log(today);

    fetchCreditValues(setCreditData,date);
    fetchDebitValues(setDebitData,date);
    updateNet(setNet,date);

}

async function fetchValuesByMonth(setDataByMonth,month){
  const {data:creditData,error:creditError}=await supabase.from('net')
  .select('*')
  .gte('date', `${new Date().getFullYear()}-${Number(month)}-01`)
  .lt('date', `${new Date().getFullYear()}-${Number(month)+1}-01`);

  if(creditError){
    console.log("Error fetching the details: ",creditError);
  }
  else{
    setDataByMonth(creditData);
  }
}


export {fetchDetails,updateNet,today,fetchValuesByMonth};