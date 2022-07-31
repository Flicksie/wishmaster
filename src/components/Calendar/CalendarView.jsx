import {useState} from 'react';

import MonthView from './MonthView';
import CalendarMonth from './CalendarMonth';

import { LocaleProvider } from '../../contexts/LocaleContext';

export default function CalendarView({year}){
  
    const monthsRange =  Object.keys([...new Array(12)]).map(x=>~~x);
    year ??= new Date().getFullYear();

    
    const [locale,setLocale] = useState();
    const [selectedMonth,selectMonth] = useState(0);
 
    
  

    return (
      <>        
        <LocaleProvider.Provider value={{locale,setLocale}}>
          <div className="calendar-body flex-wrap max-w-xl p-3">
            {
              monthsRange.map((month,i)=>  
                <CalendarMonth key={i}  month={month} year={year} selectMonth={selectMonth} />
              )
            }
          </div>
          <div className="month-details-container">
            <MonthView month={selectedMonth||0} year={year} />
          </div>
        </LocaleProvider.Provider>
      </>
    )
    
  }