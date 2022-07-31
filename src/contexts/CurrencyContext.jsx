import { createContext } from "react";

const CurrencyContext = createContext({ currencyRates: {}, baseCurrency: "PLN", setRates(){}, setBaseCurrency(){} });
export const BaseCurrencyProvider = CurrencyContext;
export const CurrencyProvider = CurrencyContext;

export default CurrencyContext;