import './main.css';
import { 
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../data/firestore"

import { useEffect, useState, useContext } from 'react';

import { LocaleProvider } from "../../contexts/LocaleContext";


// ### CALENDAR -----------------------------------------------------------------------

function CalendarView({year}){
  
  const monthsRange =  Object.keys([...new Array(12)]).map(x=>~~x);
  year ??= new Date().getYear();

  return (
    <>
      <div className="calendar-body flex-wrap max-w-xl p-3">
        {
          monthsRange.map(month=>{
            return ( <CalendarMonth month={month} year={year} /> )
          })
        }
      </div>
    </>
  )
  
}

function CalendarMonth({month}){

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
  console.log({entriesFromThisMonth,month})

  const reducer = (p,c) => p + c.value||0;
  const filterByType = (type) => (itm) => itm.confirmed && itm.type === type;

  const month_total_in = entriesFromThisMonth
    .filter(filterByType("income"))
    .reduce( reducer, 0);

  const month_total_out = entriesFromThisMonth
    .filter(filterByType("expense"))
    .reduce( reducer, 0);    

  const net_total = month_total_in - month_total_out

  //new Date(year, month, 0). getDate();

  return (
    <>
      <div className="cal-month-container rounded-md overflow-hidden w-40 h-28 shadow-md shadow-slate-200 m-1 inline-block">
        <div className="month-header bg-slate-500 px-2 pt-.5 pb-1 text-white font-bold"> {monthName} </div>
        <div className="month-body px-3 py-1">
          <div className="justify-between flex">
            <span class = "font-light text-slate-700">Income:</span>
            <span className="text-green-600" >{ month_total_in }</span>
          </div>
          <div className="justify-between flex">
            <span class = "font-light text-slate-700">Expenses:</span>
            <span className="text-red-600" >{ month_total_out }</span>
          </div>
          <div className="justify-between flex">
            <span class = "font-light text-slate-700">Net Total:</span>
            <span className={`text-${ net_total>0?'emerald':'red' }-600`} >{ net_total }</span>
          </div>
        </div>
      </div>
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
