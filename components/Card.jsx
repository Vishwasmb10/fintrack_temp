import style from '../stylesheets/Card.module.css';
import { supabase } from '../src/supabaseClient';
import { fetchDetails } from '../jsFiles/dataFetchFunctions';


export default function Card(props){
    // const date=new Date();
    // const today=(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);


    async function deleteCard(){
        // console.log(props.idAttribute);console.log(props.transactionType);console.log(props.idAttribute);
        const { error } = await supabase.from(props.transactionType).delete().eq('id', props.idAttribute);
    
        if (error) {
            console.log("Error deleting the row:", error);
        } else {
            console.log("Row deleted successfully!");
            alert('Deleted Successfully');
            fetchDetails(props.setCreditData,props.setDebitData,props.setNet,props.date);
        }
    }
    const type=`${props.transactionType}`;

    return (<div className={`${style.card} ${type=='credit'?style.credit:style.debit}`}>

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