import { useState, useContext, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../data/firestore';
import { LocaleProvider } from "../../contexts/LocaleContext";
import ExpenseEntryWriter from '../Expenses/ExpenseEntryWriter';
import ExpenseEntry from '../Expenses/ExpenseEntry';

export default function MonthView({month,year}){


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
            <ExpenseEntry { ...{ key:i, entry }}/>
          )
        }
      </>
    )
  
  }
  