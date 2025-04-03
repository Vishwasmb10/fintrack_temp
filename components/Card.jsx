import style from '../stylesheets/Card.module.css';


export default function Card(props){
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

        <button type="button" className={style.deleteBtn}>Delete</button>
        {/* <p>{props.idAttribute}</p> */}
    </div>);
}