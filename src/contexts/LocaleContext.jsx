import { createContext } from "react";

const LocaleContext = createContext({locale: "", setLocale(){} });
export const LocaleProvider = LocaleContext;

export default LocaleContext;