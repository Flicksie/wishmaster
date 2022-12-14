import { createContext, useState } from "react";

export const UserData = createContext({ 
    id: "",
    setID: () => {},
    name: "",
    setName: () => {},
    avatar: "",
    setAvatar: () => {},
    baseCurrency: "PLN",
    setBaseCurrency: () => {},
    myBalance: 0,
    setMyBalance: () => {},
    theme: "default",
    setTheme: () => {},    
    myLocale: "en",
    setMyLocale: () => {},
    myCurrencies: ["BRL","EUR","PLN","USD"],
    setMyCurrencies: () => {},
    
    myWishlist: [ ],
    myExpenses: [ ],
    setMyWishlist: () => {},
    setMyExpenses: () => {},

    dbDocID: "",
    setDbDocID: () => {},
    authenticated: false,
    authenticate: () => {},

 });

 function UserDataProvider({children}) {

    const [id, setID] = useState();
    const [name, setName] = useState();
    const [avatar, setAvatar] = useState();
    const [baseCurrency, setBaseCurrency] = useState("PLN");
    const [myBalance, setMyBalance] = useState(0);
    const [theme, setTheme] = useState("default");
    const [myLocale, setMyLocale] = useState("en");
    const [myCurrencies, setMyCurrencies] = useState( ["BRL","EUR","PLN","USD"] );
    
    const [myWishlist, setMyWishlist] = useState([ ]);
    const [myExpenses, setMyExpenses] = useState([ ]);
    
    const [dbDocID, setDbDocID] = useState();
    const [authenticated, authenticate] = useState(false);



    return (
        <UserData.Provider value={
            {
                //params
                id,
                name,
                setName,
                baseCurrency,
                myBalance,
                theme,
                myLocale,
                myCurrencies,                
                myWishlist,
                myExpenses,

                dbDocID,
                authenticated,
                
                //setters
                setID,
                avatar,
                setAvatar,
                setBaseCurrency,
                setMyBalance,
                setTheme,
                setMyLocale,
                setMyCurrencies,
                setMyWishlist,                
                setMyExpenses,

                setDbDocID,
                authenticate,                
            }
        }>
            {children}
        </UserData.Provider>
    )
 }

export default UserDataProvider;