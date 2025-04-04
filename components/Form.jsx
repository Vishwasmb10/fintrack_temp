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

    async function fetchIdValue(){
        let { data:id, error:idError } = await supabase.from('debit').select('id').order('id', { ascending: false }).limit(1);

        if (idError) {
            console.log("Error fetching max ID:", error);
        } else {
            console.log("Max ID:", id.length > 0 ? id[0].id : null);
        }

        const idValue=id[0].id+1;
        return idValue;
    }

    async function saveHandle(){
        if( product=="" || quantity=="" || amount=="" )
            return;
        
        const idValue=fetchIdValue();

        const { error } = await supabase.from('debit').insert([{ id:idValue,date, product, quantity,amount }]);
        
        if (error) console.error('Error adding user:', error);
        else {
            //alert('Product added successfully!');
            props.setCards((cards)=>{return[...cards,<Card key={id} product={product} quantity={quantity} amount={amount} idAttribute={idValue}/>]});
        }
        
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