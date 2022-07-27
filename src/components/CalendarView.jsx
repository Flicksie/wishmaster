import {useState,useRef,useEffect} from 'react';
import { LocaleProvider } from "../contexts/LocaleContext";

import MonthView from './MonthView';
import CalendarMonth from './CalendarMonth';

import getRates from '../data/currencyRates';


export default function CalendarView({year}){
  
    const monthsRange =  Object.keys([...new Array(12)]).map(x=>~~x);
    year ??= new Date().getFullYear();
    
    const [locale,setLocale] = useState();
    const [selectedMonth,selectMonth] = useState(0);


    const [currRates, setRates] = useState({loading:true});	
    const [baseCurrency, setBaseCurrency] = useState("PLN");
    const baseCurrencyRef = useRef();
	  const updateCurrencyRates = (base) => getRates(base).then( rates => setRates({loading:false,rates}) );
  
    useEffect(() => {
      setTimeout(()=>{
        updateCurrencyRates(baseCurrency)
      },0) // testing async
    }, [baseCurrency]);

    return (
      <>
        <select onChange={()=>setBaseCurrency(baseCurrencyRef.current.value)} ref={baseCurrencyRef}>
          <option value="PLN">PLN</option>
          <option value="USD">USD</option>
          <option value="BRL">BRL</option>
        </select>
        <div className="calendar-body flex-wrap max-w-xl p-3">
          {
            monthsRange.map((month,i)=>{
              return (
                <LocaleProvider.Provider value={{locale,setLocale}} key={i}>
                  <CalendarMonth baseCurrency={baseCurrency} currRates={currRates} month={month} year={year} selectMonth={selectMonth} />
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