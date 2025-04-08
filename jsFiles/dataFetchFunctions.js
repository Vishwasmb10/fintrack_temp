import { supabase } from "../src/supabaseClient";
const date=new Date();
const today=(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);

async function updateNet(setNet){ 
    const {data:netAmount,error:netError}=await supabase.from('net').select('net').eq('date',today);
      if(netError){
        console.log("Error fetching the details: ",error);
      }
      else{
        setNet(netAmount);
      }
}


async function fetchCreditValues(setCreditData){
    const {data:creditData,error:creditError}=await supabase.from('credit').select('*').eq('date',today);
    if(creditError){
      console.log("Error fetching the details: ",creditError);
    }
    else{
      setCreditData(creditData);
    }
}

async function fetchDebitValues(setDebitData){
    const {data:debitData,error:debitError}=await supabase.from('debit').select('*').eq('date',today);
    if(debitError){
      console.log("Error fetching the details: ",debitError);
    }
    else{
      setDebitData(debitData);
    }
}

async function fetchDetails(setCreditData,setDebitData,setNet){
    console.log(today);

    fetchCreditValues(setCreditData);
    fetchDebitValues(setDebitData);
    updateNet(setNet);

}



export {fetchDetails,updateNet};