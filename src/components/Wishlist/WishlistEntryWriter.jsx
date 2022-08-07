import {db} from '../../data/firestore';
import {addDoc,collection,updateDoc,doc,deleteDoc} from 'firebase/firestore'
import { useContext, useState, useRef } from 'react';
import { UserData } from '../../contexts/UserData';

import CurrencyPicker from '../BasicUI/CurrencyPicker';
import PriorityPicker from '../BasicUI/PriorityPicker';
import Button from '../BasicUI/Button';
import CurrToken from '../Budgeting/CurrencyToken';
import PriceInput from '../BasicUI/PriceInput';


export default function WishlistEntryWriter({month,year}){
  
    const urlRef         = useRef();
    const nameRef        = useRef();
 
    const descriptionRef = useRef();
    const detailsRef     = useRef();

  
    /*
    const [month, setMonth] = useState( _month || 0);
    const [year, setYear]   = useState( _year || new Date().getFullYear());
    const [type, setType]   = useState("expense");
    const [value, setValue] = useState(0);
    const [tags, setTags]   = useState([]);
    const [confirmed, setConfirmed]     = useState(false);
    */


   const [priority, setPriority] = useState(1);
   const [currency, setCurrency] = useState("PLN");
   const [price, setPrice] = useState(0);
   const [isValid, setValid] = useState(false);
   

   const validatePrice = (e) => {
      const priceIn = e.target.value;
      const isValid =  ~~priceIn > 0;
      if (isValid || priceIn === "")  setPrice( ~~priceIn || "" );
      else return false;
      return true;
    }
  
    const UserDataCtx = useContext(UserData);

    const consolidateData = ()=>{
        return {
            priority:       priority
          , name:           nameRef.current?.value
          , currency:       currency
          , price:          price
          , description:    descriptionRef.current?.value || ""
          , details:        detailsRef.current?.value || ""
          , url:            urlRef.current?.value || ""
          , user_uid:       UserDataCtx.id
        }
    }

    const addItem = async (e) => {
      e.preventDefault();
      await addDoc( collection(db, 'wishlist'), consolidateData() );
    }
  
  
    const updateItem = async (item) => {
      await updateDoc( doc(db, 'wishlist', item.id), consolidateData());
    }
  
    const deleteItem = async (item) => {
      await deleteDoc( doc(db, 'wishlist', item.id) );
    }
  
    return(
      <>
        <form onSubmit={addItem} className="flex items-center border">
          {/* month:          <input value={month} type="number"/> */}
          {/* year:           <input value={year} type="number"/> */}
          <input className='basic-input' ref={nameRef} type="" placeholder='Item Name'/>
          <PriorityPicker onChange={setPriority} value={priority} />
          <PriceInput validate={ validatePrice } onChange={ setPrice } value={ price } currency={ currency } placeholder='Price'/>
          {/*tags:           <input ref={tagsRef}        type=""/> */}
          <CurrencyPicker value={currency}  onChange={ setCurrency } />
          <input className='basic-input' ref={descriptionRef} placeholder="Item Description"/>
          <input className='basic-input' ref={urlRef} placeholder="Item URL"/>

          <Button disabled={ ~~price <= 0 } icon="fa-paper-plane" color="info" type="submit">WAWA</Button>
        </form>
      </>
    )  
  
  }
  
  