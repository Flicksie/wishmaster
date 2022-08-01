import {useState} from 'react';

import MonthView from './MonthView';
import CalendarMonth from './CalendarMonth';


export default function CalendarView({year,selectedMonth,selectMonth,monthsRange}){

    return (
      <>        
        
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
        
      </>
    )
    
  }