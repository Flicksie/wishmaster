import Dropdown from "./Dropdown";


const availableCurrencies = [
    {label: "Polish Zloty", value: "PLN"},
    {label: "Brazilian Real", value: "BRL"},
    {label: "Euro", value: "EUR"},
    {label: "US Dollar", value: "USD"},
]

export default function CurrencyPicker({className,onChange,value,placeholder})  {
    return ( 
        <Dropdown { ...{onChange,value,placeholder,className} } options={availableCurrencies}/>
    )
}