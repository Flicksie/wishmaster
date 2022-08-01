import './main.css';
import CalendarView from '../../components/Calendar/CalendarView';
import Wishlist from '../../components/Wishlist/WishlistMain';
import { useState, useEffect } from 'react';
import CurrencyContext from '../../contexts/CurrencyContext';
import CurrencyPicker from '../../components/BasicUI/CurrencyPicker';  
import { LocaleProvider } from '../../contexts/LocaleContext';
    
import getRates from '../../data/currencyRates';
import Dropdown from '../../components/BasicUI/Dropdown';

function Home() {

  const [screen,setScreen] = useState("WISHLIST");

  const [locale,setLocale] = useState();
  const [baseCurrency, setBaseCurrency] = useState("PLN");
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
