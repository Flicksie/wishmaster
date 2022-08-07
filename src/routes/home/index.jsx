import { useState, useEffect } from 'react';

import Budgeting from '../../components/Budgeting/BudgetingView';
import Wishlist from '../../components/Wishlist/WishlistMain';

import CurrencyContext from '../../contexts/CurrencyContext';
import CurrencyPicker from '../../components/BasicUI/CurrencyPicker';  
import { LocaleProvider } from '../../contexts/LocaleContext';
    
import getRates from '../../data/currencyRates';
import Dropdown from '../../components/BasicUI/Dropdown';

import { useContext } from 'react';
import { UserData } from '../../contexts/UserData';




function Home() {
  

  const [screen,setScreen] = useState("CALENDAR");

  const UserDataCtx = useContext(UserData);

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
      
        
        <div className="Home">
           
          <section className="container shadow-xl m-auto my-10 bg-purple-200 rounded-2xl ">
            
            <div className='container-head bg-purple-500 p-3 rounded-t-2xl'>
              <CurrencyPicker className="bg-purple-100" onChange={ setBaseCurrency } value={baseCurrency} placeholder="Select base currency..." />
              <Dropdown className="bg-purple-100" onChange={ setYear } value={year} options={ [ 2022, 2023, 2024, 2025] } />
              <Dropdown className="bg-purple-100" onChange={ selectMonth } value={selectedMonth} options={ monthsRange.map(m => ({ value:m, label: new Date(1,m,1).toLocaleString(locale,{month:"long"}) }))} />
            </div>

            <div className='container-body flex w-full'>
              {
                screen === "WISHLIST"?
                  <Wishlist />
                : screen === "CALENDAR" ?
                  <Budgeting { ...{selectedMonth,selectMonth,monthsRange,year} }/>
                  : ""
              }
            </div>

                    
          </section>
        </div>

      </LocaleProvider.Provider>
    </CurrencyContext.Provider>
  );
}

export default Home;
