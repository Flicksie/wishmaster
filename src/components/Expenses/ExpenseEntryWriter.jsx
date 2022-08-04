import {useRef,useState} from 'react';
import {db} from '../../data/firestore';
import {addDoc,collection,updateDoc,doc,deleteDoc} from 'firebase/firestore'
import CurrencyPicker from '../BasicUI/CurrencyPicker';
import Dropdown from '../BasicUI/Dropdown';
import ToggleSwitch from '../BasicUI/ToggleSwitch';
import { useContext } from 'react';
import { UserData } from '../../contexts/UserData';
import PriceInput from '../BasicUI/PriceInput';

export default function ExpenseEntryWriter({month,year}){
  
    //const monthRef = useRef(month);
    //const yearRef = useRef();
    const [type, setType]   = useState("expense");
    const [amount, setAmount]   = useState(0);
    const valueRef = useRef();
    const endMonthRef = useRef();
    const endYearRef = useRef();
    //const tagsRef = useRef();
    //const currencyRef = useRef();
    const [currency, setCurrency]   = useState("PLN");
    const [confirmed, setConfirmed] = useState(false);
    const [recurring, setRecurring] = useState(false);
    const descriptionRef = useRef();
  
    /*
    const [month, setMonth] = useState( _month || 0);
    const [year, setYear]   = useState( _year || new Date().getFullYear());
    
    const [value, setValue] = useState(0);
    const [tags, setTags]   = useState([]);
    
    const [description, setDescription] = useState("");
    */

    const UserDataCtx = useContext(UserData);
  
    const addItem = async (e) => {
      e.preventDefault();
      const form = {
          month:          month //~~monthRef.current?.value
        , year:           year  //~~yearRef.current?.value
        , type:           type
        , value:        ~~amount
        //, tags:           tagsRef.current?.value
        , currency:       currency
        , confirmed:      confirmed
        , recurring:      recurring
        , description:    descriptionRef.current?.value || ""
        , user_uid:       UserDataCtx.id
        , endMonth:     ~~(endMonthRef.current?.value )|| null
        , endYear:      ~~(endYearRef.current?.value  )|| null
      };

      await addDoc( collection(db, 'calendata'), form);
    }
  
  
    const updateItem = async (item) => {
      await updateDoc( doc(db, 'calendata', item.id), {
        //month, year, type, value, tags, currency, confirmed, description
      });
    }
  
    const deleteItem = async (item) => {
      await deleteDoc( doc(db, 'calendata', item.id) );
    }
  
    return(
      <>
        <form onSubmit={addItem} onChange={(e)=>console.log('wawa:',e )}>
          {/* month:          <input value={month} type="number"/> */}
          {/* year:           <input value={year} type="number"/> */}
          type:            <Dropdown name="type" onChange={setType} options={[
            {label:"Expense",value:"expense"},
            {label:"Income",value:"income"}
          ]}/>

          value:          <PriceInput onChange={setAmount} value={amount} currency={currency} />
          {/*tags:           <input ref={tagsRef}        type=""/> */}
          currency:       <CurrencyPicker name="currency" onChange={ setCurrency } />
          confirmed:      <ToggleSwitch  name="confirmed" onChange={ setConfirmed } />
          recurring:      <ToggleSwitch  name="recurring" onChange={ setRecurring } />
          {
            recurring 
            ? <>
                month:          <input ref={endMonthRef} type="number"/>
                year:           <input ref={endYearRef} type="number"/>
            </>
            : ""
          }
          description:    <input name="description"  ref={descriptionRef} type=""/>
          <button type="submit">WA</button>
        </form>
      </>
    )
  
  
  }
  
  