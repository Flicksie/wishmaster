import { forwardRef } from "react"

const availableCurrencies = [
    {label: "Polish Zloty", value: "PLN"},
    {label: "Brazilian Real", value: "BRL"},
    {label: "US Dollar", value: "USD"},
]

 const CurrencyPicker = forwardRef( ({onChange, options = availableCurrencies}, ref) => {
    return (
        <select key={ref} {...{onChange,ref}} >
            {options.map(({value,label,icon},key) =>
                <option {...{key,value}}> {label} </option>
            )}
        </select>
    )
})

export default CurrencyPicker;