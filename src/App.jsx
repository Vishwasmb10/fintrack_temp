import { useState } from 'react'
import style from '../stylesheets/App.module.css';
import Form from '../components/Form';


function App() {

  const [isClicked,setIsClicked]=useState(false);
  const [cards,setCards]=useState([]);

  function formDisplay(){
    setIsClicked((isClicked)=>!isClicked);
  }


  return (
    <div className={style.app}>
      <button type='button' className={style.addBtn} onClick={formDisplay}>+</button>
      {!isClicked?"":<div className={style.form}><Form cards={cards} setCards={setCards}/></div>}
      <div className={style.cards}>{cards}</div>
    </div>
  )
}

export default App
