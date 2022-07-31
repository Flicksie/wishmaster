import './main.css';
import CalendarView from '../../components/Calendar/CalendarView';
import Wishlist from '../../components/Wishlist/WishlistMain';
import { useState, useEffect } from 'react';
import CurrencyContext from '../../contexts/CurrencyContext';
import CurrencyPicker from '../../components/BasicUI/CurrencyPicker';

import getRates from '../../data/currencyRates';

function Home() {

  const [screen,setScreen] = useState("WISHLIST");
  



  const [baseCurrency, setBaseCurrency] = useState("PLN");
  const [currencyRates, setRates] = useState({loading:true});

  
  const updateCurrencyRates = (base) => getRates(base).then( rates => setRates({loading:false,rates}) );
  
  useEffect(() => {
    setTimeout(()=>{
      updateCurrencyRates(baseCurrency)
    },0) // testing async
  }, [baseCurrency]);

  return (
    <CurrencyContext.Provider value={{currencyRates,setRates,baseCurrency,setBaseCurrency}}>
      
    <div className="App">
      <header className="App-header"> 
      
      <CurrencyPicker onChange={ setBaseCurrency }  placeholder="Select base currency..." />
      
      </header>
      <section className="container-main">
              
        <CalendarView />        
        <Wishlist />        
      </section>
    </div>

    </CurrencyContext.Provider>
  );
}

export default Home;
