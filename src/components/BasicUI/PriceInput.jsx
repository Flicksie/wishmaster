import CurrToken from "../Budgeting/CurrencyToken";

export default function PriceInput({validate,onChange,value,placeholder,currency}){
    
    validate ??= (e) => {
        const priceIn = e.target.value;
        const isValid =  ~~priceIn > 0;
        if (isValid || priceIn === "")  onChange( ~~priceIn || "" );
        else return false;
        return true;
    }
    placeholder ??= "Amount"

    return (
        <div className='basic-input mr-5 inline '>
            <input className="text-right no-focus mr-1 w-12" onChange={validate} {...{value,placeholder}} />
            <CurrToken>{currency}</CurrToken>
        </div>
    )
}