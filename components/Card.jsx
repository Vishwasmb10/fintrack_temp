import style from '../stylesheets/Card.module.css';
import { supabase } from '../src/supabaseClient';
import { fetchDetails, updateNet } from '../jsFiles/dataFetchFunctions';
import { useState } from 'react';

export default function Card(props) {
    const [editState, setEditState] = useState(false);
    const [product, setProduct] = useState(props.product);
    const [quantity, setQuantity] = useState(props.quantity);
    const [amount, setAmount] = useState(props.amount);

    async function deleteCard() {
        const { error } = await supabase.from(props.transactionType).delete().eq('id', props.idAttribute);
    
        if (error) {
            console.log("Error deleting the row:", error);
        } else {
            console.log("Row deleted successfully!");
            alert('Deleted Successfully');
            fetchDetails(props.setCreditData, props.setDebitData, props.setNet, props.date);
        }
    }

    function handleProduct(e) {
        setProduct(e.target.value);
    }

    function handleQuantity(e) {
        setQuantity(e.target.value);
    }

    function handleAmount(e) {
        setAmount(e.target.value);
    }

    async function editCard() {
        setEditState((state) => !state);
    }

    async function submitCard() {
        editValues();
        setEditState((state) => !state);
    }

    async function editValues() {
        let multipleAmounts = [];
        if(typeof amount == "string") {
            multipleAmounts = amount.split("+");
        }
        
        if(!multipleAmounts || multipleAmounts.length == 0) {
            const { data, error } = await supabase
                .from(props.transactionType)
                .update({ product: product, quantity: quantity, amount: amount })
                .eq('id', props.idAttribute);

            if (error) {
                console.error('Update error:', error);
            } else {
                console.log('Update success:', data);
                updateNet(props.setNet, props.date);
            }
        } else {
            console.log(multipleAmounts);
            const sum = multipleAmounts.reduce((sum, ele) => sum + Number(ele), 0);
            setAmount(sum);
            const { data, error } = await supabase
                .from(props.transactionType)
                .update({ product: product, quantity: quantity, amount: sum })
                .eq('id', props.idAttribute); 
                
            if (error) {
                console.error('Update error:', error);
            } else {
                console.log('Update success:', data);
                updateNet(props.setNet, props.date);
            }                  
        }
    }

    const type = props.transactionType;

    return (
        <div className={`${style.card} ${type == 'credit' ? style.credit : style.debit}`}>
            {!editState ? (
                <>
                    <div className={style.tableHeader}>
                        <div>Product</div>
                        <div>Qty</div>
                        <div>Amount</div>
                    </div>
                    <div className={style.tableRow}>
                        <div className={style.tableCell}>{product}</div>
                        <div className={style.tableCell}>{quantity}</div>
                        <div className={style.tableCell}>{amount}</div>
                    </div>
                    <div className={style.buttonContainer}>
                        <button type="button" className={style.editBtn} onClick={editCard}>Edit</button>
                        <button type="button" className={style.deleteBtn} onClick={deleteCard}>Delete</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={style.tableHeader}>
                        <div colSpan="3">Edit Transaction</div>
                    </div>
                    <div className={style.editForm}>
                        <div className={style.editFormRow}>
                            <label>Product</label>
                            <input type='text' className={style.inputField} value={product} onChange={handleProduct} />
                        </div>
                        <div className={style.editFormRow}>
                            <label>Quantity</label>
                            <input type='text' className={style.inputField} value={quantity} onChange={handleQuantity} />
                        </div>
                        <div className={style.editFormRow}>
                            <label>Amount</label>
                            <input type='text' className={style.inputField} value={amount} onChange={handleAmount} />
                        </div>
                        <div className={style.buttonContainer}>
                            <button type="button" className={style.submitBtn} onClick={submitCard}>Save</button>  
                            <button type="button" className={style.editBtn} onClick={editCard}>Cancel</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}