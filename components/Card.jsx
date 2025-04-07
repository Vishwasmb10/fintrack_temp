import style from '../stylesheets/Card.module.css';
import { supabase } from '../src/supabaseClient';



export default function Card(props){
    const date=new Date();
    const today=(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);

    async function updateNet(){ 
        const {data:netAmount,error:netError}=await supabase.from('net').select('net').eq('date',today);
          if(netError){
            console.log("Error fetching the details: ",error);
          }
          else{
            props.setNet(netAmount);
          }
        }

        async function fetchCreditValues(){
          const {data:creditData,error:creditError}=await supabase.from('credit').select('*').eq('date',today);
          if(creditError){
            console.log("Error fetching the details: ",creditError);
          }
          else{
            props.setCreditData(creditData);
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
            props.setDebitData(debitData);
            // console.log(debitData);
            // console.log("here:");
          }
        }
      
    async function deleteCard(){
        console.log(props.idAttribute);
        console.log(props.transactionType);
        console.log(props.idAttribute);
        const { error } = await supabase.from(props.transactionType).delete().eq('id', props.idAttribute);
    
        if (error) {
            console.log("Error deleting the row:", error);
        } else {
            console.log("Row deleted successfully!");
            alert('Deleted Successfully');
            async function fetchDetails(){
              console.log(today);
        
              fetchCreditValues();
              fetchDebitValues();
              updateNet();
        
            }
            fetchDetails();
        }
    }


    return (<div className={style.card}>

        <div className={style.info}>
            <p>Product</p>
            <p>{props.product}</p>
        </div>

        <div className={style.info}>
            <p>Quantity</p>
            <p>{props.quantity}</p>
        </div>
        
        <div className={style.info}>
            <p>Amount</p>
            <p>{props.amount}</p>
        </div>

        <button type="button" className={style.deleteBtn} onClick={deleteCard}>Delete</button>
        {/* <p>{props.idAttribute}</p> */}
    </div>);
}