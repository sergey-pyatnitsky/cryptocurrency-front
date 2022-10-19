import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IContextProps {
  currency: string;
  setCurrency: Dispatch<SetStateAction<string>>;
  symbol: string;
}

const Crypto = createContext({} as IContextProps);

const CryptoContext = ({ children }: any) => {
  const currencyFromStorage = localStorage.getItem("currency");
  const currencySymbol = currencyFromStorage == "USD" ? "$" : "€"
  const [currency, setCurrency] = useState<string>(currencyFromStorage != null ? currencyFromStorage : "USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "EUR") setSymbol("€");
    else if (currency === "USD") setSymbol("$");

    localStorage.setItem("currency", currency)
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
