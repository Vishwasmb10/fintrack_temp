import { useState } from 'react';
import style from '../stylesheets/Form.module.css';
import Card from './Card';
import { supabase } from '../src/supabaseClient';

export default function Form(props){
    const [product,setProduct]=useState("");
    const [quantity,setQuantity]=useState();
    const [amount,setAmount]=useState();

    const dateObj=new Date();
    const date=(`${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}`);


    async function saveHandle(){
        if(product=="" || quantity=="" || amount=="" )
            return;
        const id=props.cards.length+1;
        const { error } = await supabase.from('debit').insert([{ id,date, product, quantity,amount }]);
        if (error) console.error('Error adding user:', error);
        else {//alert('Product added successfully!');
        props.setCards((cards)=>{return[...cards,<Card key={id} product={product} quantity={quantity} amount={amount} idAttribute={cards.length+1}/>]});}
        
        setProduct("");
        setQuantity("");
        setAmount("");
        props.setIsClicked(false);

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
            
            <button type="button" onClick={()=>{saveHandle();}} className={style.saveBtn}>Save</button>
        </form>
    </div>);
}