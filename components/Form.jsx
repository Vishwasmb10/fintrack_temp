import { useState } from 'react';
import style from '../stylesheets/Form.module.css';
import Card from './Card';

export default function Form(props){
    const [product,setProduct]=useState("");
    const [quantity,setQuantity]=useState();
    const [amount,setAmount]=useState();

    function saveHandle(){
        if(product=="" || quantity=="" || amount=="" )
            return;
        props.setCards((cards)=>{return[...cards,<Card key="product" product={product} quantity={quantity} amount={amount} />]});
        setProduct("");
        setQuantity("");
        setAmount("");

    }

    function handleProduct(e){
        setProduct(e.target.value);
    }

    function handleQuantity(e){
        setQuantity(e.target.value);
    }

    function handleAmount(e){
        setAmount(e.target.value);
    }


    return (<div className={style.form}>
        <form autoComplete='off'>
            <label htmlFor="product">Product</label>
            <input type="text" name="product" id="product" value={product} onChange={handleProduct}/>

            <label htmlFor="quantity">Quantity</label>
            <input type="text" name="quantity" id="quantity" value={quantity} onChange={handleQuantity}/>

            <label htmlFor="amt">Amount</label>
            <input type="text" name="amt" id="amt" value={amount} onChange={handleAmount}/>
            
            <button type="button" onClick={()=>{saveHandle();}}>Save</button>
        </form>
    </div>);
}