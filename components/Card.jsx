import style from '../stylesheets/Card.module.css';


export default function Card(props){
    return (<div className={style.card}>
        <p>{props.product}</p>
        <p>{props.quantity}</p>
        <p>{props.amount}</p>
    </div>);
}