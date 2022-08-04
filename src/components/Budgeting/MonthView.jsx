import { useContext } from 'react';

import { LocaleProvider } from "../../contexts/LocaleContext";
import ExpenseEntryWriter from '../Expenses/ExpenseEntryWriter';
import ExpenseEntry from '../Expenses/ExpenseEntry';
import { UserData } from '../../contexts/UserData';
import { activeInMonth } from '../../data/calendarOperations';

export default function MonthView({month,year}){


    // [TODO] Repeating code, optimise later
  
    const locale = useContext(LocaleProvider);
    const { myExpenses } = useContext(UserData);

  
    const monthName = new Date(1,month,1).toLocaleString(locale, { month: 'long' });
    const entriesFromThisMonth = myExpenses.filter( entry => activeInMonth(entry,year,month) );
    
    // End of Repeating code ------ ^
  
    return (
      <>
        <ExpenseEntryWriter month={month} year={year}></ExpenseEntryWriter>
        <p>
          inmo month: {monthName}, year: {year}        
        </p>
        {
          entriesFromThisMonth.map((entry,i)=>
            <ExpenseEntry { ...{ key:i, entry, year, month }}/>
          )
        }
      </>
    )
  
  }
  