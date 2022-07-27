import {useState} from 'react';
import { LocaleProvider } from "../contexts/LocaleContext";

import MonthView from './MonthView';
import CalendarMonth from './CalendarMonth';

export default function CalendarView({year}){
  
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