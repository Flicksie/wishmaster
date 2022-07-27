import './main.css';
import { 
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../data/firestore"

import { useEffect, useState, useContext, useRef } from 'react';

import { LocaleProvider } from "../../contexts/LocaleContext";

// ### CALENDAR -----------------------------------------------------------------------

function CalendarView({year}){
  
  const monthsRange =  Object.keys([...new Array(12)]).map(x=>~~x);
  console.log(year);
  year ??= new Date().getFullYear();
  console.log(year,'b');
  
  const [locale,setLocale] = useState();
  const [selectedMonth,selectMonth] = useState(0);

  return (
    <>
      <div className="calendar-body flex-wrap max-w-xl p-3">
        {
          monthsRange.map((month,i)=>{
            return (
              <LocaleProvider.Provider value={{locale,setLocale}} key={i}>
                <CalendarMonth month={month} year={year} selectMonth={selectMonth} />
              </LocaleProvider.Provider>
            )
          })
        }
      </div>
      <div className="month-details-container">
        <MonthView month={selectedMonth||0} year={year} />
      </div>
    </>
  )
  
}

//------------------------------------------------------------------

const MonthTools = {
  reducer : (p,c) => p + c.value||0,
  filterByType : (type) => (itm) => itm.confirmed && itm.type === type
}

function CalendarMonth({month,selectMonth}){

  const {locale,setLocale} = useContext(LocaleProvider);

  const [entries, setEntries] = useState([]);

  useEffect(()=>{
    const q = query(collection(db,"calendata"));
    const unsub = onSnapshot(q,(querySnapshot)=>{
      let dbItems=[];
      querySnapshot.forEach(doc => {
        dbItems.push({...doc.data(), id: doc.id})
      })
      setEntries(dbItems);
    });
    return ()=> unsub();
  },[]);

  const monthName = new Date(1,month,1).toLocaleString(locale, { month: 'long' });
  const entriesFromThisMonth = entries.filter(entry=>entry.month === month);

  const month_total_in = entriesFromThisMonth
    .filter( MonthTools.filterByType("income"))
    .reduce( MonthTools.reducer, 0);

  const month_total_out = entriesFromThisMonth
    .filter( MonthTools.filterByType("expense"))
    .reduce( MonthTools.reducer, 0);    

  const net_total = month_total_in - month_total_out

  //new Date(year, month, 0). getDate();

  return (
    <>
      <div onClick={()=>selectMonth(month)} className="cursor-pointer cal-month-container rounded-md overflow-hidden w-40 h-28 shadow-md shadow-slate-200 m-1 inline-block">
        <div className="month-header bg-slate-500 px-2 pt-.5 pb-1 text-white font-bold"> {monthName} </div>
        <div className="month-body px-3 py-1">
          <div className="justify-between flex">
            <span className = "font-light text-slate-700">Income:</span>
            <span className="text-green-600" >{ month_total_in }</span>
          </div>
          <div className="justify-between flex">
            <span className = "font-light text-slate-700">Expenses:</span>
            <span className="text-red-600" >{ month_total_out }</span>
          </div>
          <div className="justify-between flex">
            <span className = "font-light text-slate-700">Net Total:</span>
            <span className={net_total>0?'text-emerald-700':'text-red-700'} >{ net_total }</span>
          </div>
        </div>
      </div>
    </>
  )

}

// -----------------------------------------------------------------------------------

function MonthView({month,year}){


  // [TODO] Repeating code, optimise later

  const locale = useContext(LocaleProvider);
  const [entries, setEntries] = useState([]);

  useEffect(()=>{
    const q = query(collection(db,"calendata"));
    const unsub = onSnapshot(q,(querySnapshot)=>{
      let dbItems=[];
      querySnapshot.forEach(doc => {
        dbItems.push({...doc.data(), id: doc.id})
      })
      setEntries(dbItems);
    });
    return ()=> unsub();
  },[]);

  const monthName = new Date(1,month,1).toLocaleString(locale, { month: 'long' });
  const entriesFromThisMonth = entries.filter(entry=>entry.month === month);
  
  // End of Repeating code ------ ^

  return (
    <>
      <ExpenseEntryWriter month={month} year={year}></ExpenseEntryWriter>
      <p>
        inmo month: {monthName}, year: {year}        
      </p>
      {
        entriesFromThisMonth.map((entry,i)=>
          <p key={i}>
            {entry.type} {entry.value} {entry.currency}
          </p>
        )
      }
    </>
  )

}

// -----------------------------------------------------------------------------------

function ExpenseEntryWriter({month,year}){
  
  const monthRef = useRef(month);
  const yearRef = useRef();
  const typeRef = useRef();
  const valueRef = useRef();
  const tagsRef = useRef();
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



// -----------------------------------------------------------------------------------

function App() {


  return (
    <div className="App">
      <header className="App-header"> </header>
      <section className="container-main">
        test
        <CalendarView />        
      </section>
    </div>
  );
}

export default App;
