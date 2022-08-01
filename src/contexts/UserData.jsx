import { createContext, useContext, useState } from "react";

const UserData = createContext({ 
    id: "",
    setID: () => {},
    preferredCurrency: "PLN",
    setPrefCurrency: () => {},
    myBalance: 0,
    setMyBalance: () => {},
    theme: "default",
    setTheme: () => {},    
    myLocale: "en",
    setMyLocale: () => {},
    myCurrencies: ["BRL","EUR","PLN","USD"],
    setMyCurrencies: () => {},
 });

 function UserDataProvider({children}) {

    const [id, setID] = useState();
    const [preferredCurrency, setPreferredCurrency] = useState();
    const [myBalance, setMyBalance] = useState();
    const [theme, setTheme] = useState();
    const [myLocale, setMyLocale] = useState();
    const [myCurrencies, setMyCurrencies] = useState();

    return (
        <UserData.Provider value={
            {
                //params
                id,
                preferredCurrency,
                myBalance,
                theme,
                myLocale,
                myCurrencies,
                
                //setters
                setID,
                setPreferredCurrency,
                setMyBalance,
                setTheme,
                setMyLocale,
                setMyCurrencies,
            }
        }>
            {children}
        </UserData.Provider>
    )
 }

export default UserDataProvider;