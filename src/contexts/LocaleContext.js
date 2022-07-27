import { createContext } from "react";

const LocaleContext = createContext({locale: "de", setLocale(){} });
export const LocaleProvider = LocaleContext;

export default LocaleContext;