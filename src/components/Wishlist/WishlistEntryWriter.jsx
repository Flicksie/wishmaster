import {useRef} from 'react';
import {db} from '../../data/firestore';
import {addDoc,collection,updateDoc,doc,deleteDoc} from 'firebase/firestore'
import { useContext } from 'react';
import { UserData } from '../../contexts/UserData';

export default function WishlistEntryWriter({month,year}){
  
    const priorityRef    = useRef();
    const nameRef        = useRef();
    const currencyRef    = useRef();
    const priceRef       = useRef();
    const descriptionRef = useRef();
    const detailsRef     = useRef();
    const acquiredRef    = useRef();
  
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
  
    const UserDataCtx = useContext(UserData);

    const consolidateData = ()=>{
        return {
            priority:     ~~priorityRef.current?.value
          , name:           nameRef.current?.value
          , currency:       currencyRef.current?.value
          , price:          priceRef.current?.value
          , description:    descriptionRef.current?.value
          , details:        detailsRef.current?.value
          , acquired:       acquiredRef.current?.checked
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
        <form onSubmit={addItem}>
          {/* month:          <input value={month} type="number"/> */}
          {/* year:           <input value={year} type="number"/> */}
          priority:           <select ref={priorityRef}>
            <option value="1">(1) High</option>
            <option value="2">(2) </option>
            <option value="3">(3) </option>
            <option value="4">(4) </option>
            <option value="5">(5) </option>
            <option value="6">(6) </option>
            <option value="7">(7) </option>
            <option value="8">(8) </option>
            <option value="9">(9) </option>
            <option value="10">(10) Low)</option>
          </select>
          price:          <input ref={priceRef}  min="0" type="number"/>
          {/*tags:           <input ref={tagsRef}        type=""/> */}
          currency:       <select ref={currencyRef}>
            <option value="PLN">Polish Zloty</option>
            <option value="USD">US Dollar</option>
            <option value="BRL">Brazilian Real</option>
          </select>
          acquired:      <input ref={acquiredRef}   type="checkbox"/>
          description:    <input ref={descriptionRef} type=""/>
          name:    <input ref={nameRef} type=""/>
          <button type="submit">WAWA</button>
        </form>
      </>
    )
  
  
  }
  
  