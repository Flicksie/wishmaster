import './main.css';
import { useState, useEffect } from 'react';

import CalendarView from '../../components/Calendar/CalendarView';
import Wishlist from '../../components/Wishlist/WishlistMain';

import CurrencyContext from '../../contexts/CurrencyContext';
import CurrencyPicker from '../../components/BasicUI/CurrencyPicker';  
import { LocaleProvider } from '../../contexts/LocaleContext';
    
import getRates from '../../data/currencyRates';
import Dropdown from '../../components/BasicUI/Dropdown';

import { Authentication } from '../../data/AuthManager';
import { useContext } from 'react';
import { UserData } from '../../contexts/UserData';

function Home() {

  const [screen,setScreen] = useState("WISHLIST");

  const UserDataCtx = useContext(UserData);

  console.log(UserDataCtx)
  const {baseCurrency, setBaseCurrency,locale,setLocale} = UserDataCtx;

  const [currencyRates, setRates] = useState({loading:true});

  
  const [selectedMonth,selectMonth] = useState(0);
  const monthsRange =  Object.keys([...new Array(12)]).map(x=>~~x);
  const [year,setYear] = useState(new Date().getFullYear());

  
  const updateCurrencyRates = (base) => getRates(base).then( rates => setRates({loading:false,rates}) );
  
  useEffect(() => {
    setTimeout(()=>{
      updateCurrencyRates(baseCurrency)
    },0) // testing async
  }, [baseCurrency]);

  return (
    <CurrencyContext.Provider value={{currencyRates,setRates,baseCurrency,setBaseCurrency}}>
      <LocaleProvider.Provider value={{locale,setLocale}}>
      
        
        <div className="App">
          <header className="App-header"> 
          <Authentication></Authentication>
          
          <CurrencyPicker onChange={ setBaseCurrency }  placeholder="Select base currency..." />
          <Dropdown onChange={selectMonth} options={ monthsRange.map(m => ({ value:m, label: new Date(1,m,1).toLocaleString(locale,{month:"long"}) }))}/>          
          </header>
          <section className="container-main">
                  
            <CalendarView { ...{selectedMonth,selectMonth,monthsRange,year} }/>
            <Wishlist />

            
                    
          </section>
        </div>

      </LocaleProvider.Provider>
    </CurrencyContext.Provider>
  );
}

export default Home;
