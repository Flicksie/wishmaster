import {useRef} from 'react';
import {db} from '../data/firestore';
import {addDoc,collection,updateDoc,doc,deleteDoc} from 'firebase/firestore'

export default function ExpenseEntryWriter({month,year}){
  
    //const monthRef = useRef(month);
    //const yearRef = useRef();
    const typeRef = useRef();
    const valueRef = useRef();
    //const tagsRef = useRef();
    const currencyRef = useRef();
    const confirmedRef = useRef();
    const descriptionRef = useRef();
  
    /*
    const [month, setMonth] = useState( _month || 0);
    const [year, setYear]   = useState( _year || new Date().getFullYear());
    const [type, setType]   = useState("expense");
    const [value, setValue] = useState(0);
    const [tags, setTags]   = useState([]);
    const [currency, setCurrency]       = useState("PLN");
    const [confirmed, setConfirmed]     = useState(false);
    const [description, setDescription] = useState("");
    */
  
    const addItem = async (e) => {
      e.preventDefault();
      console.log(confirmedRef,confirmedRef.current)
      await addDoc( collection(db, 'calendata'), {
          month:          month //~~monthRef.current?.value
        , year:           year  //~~yearRef.current?.value
        , type:           typeRef.current?.value
        , value:        ~~valueRef.current?.value
        //, tags:           tagsRef.current?.value
        , currency:       currencyRef.current?.value
        , confirmed:      confirmedRef.current?.checked
        , description:    descriptionRef.current?.value
      });
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
        <form onSubmit={addItem}>
          {/* month:          <input value={month} type="number"/> */}
          {/* year:           <input value={year} type="number"/> */}
          type:           <select ref={typeRef}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          value:          <input ref={valueRef}  min="0" type="number"/>
          {/*tags:           <input ref={tagsRef}        type=""/> */}
          currency:       <select ref={currencyRef}>
            <option value="PLN">Polish Zloty</option>
            <option value="USD">US Dollar</option>
          </select>
          confirmed:      <input ref={confirmedRef}   type="checkbox"/>
          description:    <input ref={descriptionRef} type=""/>
          <button type="submit">WA</button>
        </form>
      </>
    )
  
  
  }
  
  