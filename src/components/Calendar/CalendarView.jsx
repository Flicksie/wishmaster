import {useState,useRef,useEffect} from 'react';
import { LocaleProvider } from "../../contexts/LocaleContext";

import MonthView from './MonthView';
import CalendarMonth from './CalendarMonth';

import getRates from '../../data/currencyRates';
import CurrencyPicker from '../BasicUI/CurrencyPicker';


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
        <LocaleProvider.Provider value={{locale,setLocale}}>

          <CurrencyPicker onChange={()=>setBaseCurrency(baseCurrencyRef.current.value)} ref={baseCurrencyRef} />
          
          <div className="calendar-body flex-wrap max-w-xl p-3">
            {
              monthsRange.map((month,i)=>  
                <CalendarMonth key={i} baseCurrency={baseCurrency} currRates={currRates} month={month} year={year} selectMonth={selectMonth} />
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