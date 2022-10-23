import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IContextProps {
  currency: string;
  setCurrency: Dispatch<SetStateAction<string>>;
  symbol: string;
}

const Crypto = createContext({} as IContextProps);

const CryptoContext = ({ children }: any) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "EUR") setSymbol("€");
    else if (currency === "USD") setSymbol("$");
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
