import {useRef,useState} from 'react';
import {db} from '../../data/firestore';
import {addDoc,collection,updateDoc,doc,deleteDoc} from 'firebase/firestore'
import CurrencyPicker from '../BasicUI/CurrencyPicker';
import Dropdown from '../BasicUI/Dropdown';
import ToggleSwitch from '../BasicUI/ToggleSwitch';
import { useContext } from 'react';
import { UserData } from '../../contexts/UserData';
import PriceInput from '../BasicUI/PriceInput';
import Button from '../BasicUI/Button';

const monthsRange =  Object.keys([...new Array(12)]).map(x=>~~x);

export default function ExpenseEntryWriter({month,year}){
  
    //const monthRef = useRef(month);
    //const yearRef = useRef();
    const [type, setType]   = useState("expense");
    const [amount, setAmount]   = useState(0);
    const valueRef = useRef();

    const [endMonth,setEndMonth] = useState(1);
    const [endYear,setEndYear] = useState(2022);
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
    const {locale} = UserDataCtx;
  
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
        , endMonth:     ~~(endMonth)|| null
        , endYear:      ~~(endYear )|| null
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
          <Dropdown addClasses="w-[200px]" name="type" onChange={setType} options={[
            {label:"Expense",value:"expense"},
            {label:"Income",value:"income"}
          ]}/>
          <PriceInput onChange={setAmount} value={amount} currency={currency} />
          {/*tags:           <input ref={tagsRef}        type=""/> */}
          <CurrencyPicker name="currency" onChange={ setCurrency } />
          confirmed:      <ToggleSwitch  name="confirmed" onChange={ setConfirmed } />
          <div className={`
            relative inline-flex items-center border rounded-md
            h-10 ${ recurring?"w-[290px]":"w-[160px]" } 
            transition-all
            p-2
            box-content
            mx-2
          `}>
          <ToggleSwitch  name="recurring" onChange={ setRecurring } />
          {
            recurring 
            ? <>
                <div  className='animate-fadeIn relative flex-column items-center w-fit inline-block'>
                  <div className='flex'>
                    <Dropdown  onChange={ setEndYear  } value={endYear} options={ [ 2022, 2023, 2024, 2025] } />
                    <Dropdown  onChange={ setEndMonth} value={endMonth} options={ monthsRange.map(m => ({ value:m, label: new Date(1,m,1).toLocaleString(locale,{month:"long"}) }))} />
                  </div>
                  <small className='bg-white px-3 animate-slideRight w-auto absolute text-center block text-slate-400'>END DATE</small>
                </div>
            </>
            : <span className='ml-5'>Recurring</span>
          }
          </div>
          <input className="basic-input" placeholder='Description'  ref={descriptionRef} type=""/>
          <Button disabled={ ~~amount <= 0 } icon="fa-paper-plane" color="info" type="submit">WAWA</Button>
          
        </form>
      </>
    )
  
  
  }
  
  