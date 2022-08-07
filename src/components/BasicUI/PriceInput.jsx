import CurrToken from "../Budgeting/CurrencyToken";

export default function PriceInput({className,validate,onChange,value,placeholder,currency}){
    
    validate ??= (e) => {
        const priceIn = e.target.value;
        const isValid =  ~~priceIn > 0;
        if (isValid || priceIn === "")  onChange( ~~priceIn || "" );
        else return false;
        return true;
    }
    placeholder ??= "Amount"

    return (
        <div className={'basic-input mr-1 p-2 inline-flex items-center '+(className||"")}>
            <input className="text-right no-focus mr-1 w-14" onChange={validate} {...{value,placeholder}} />
            <CurrToken>{currency}</CurrToken>
        </div>
    )
}