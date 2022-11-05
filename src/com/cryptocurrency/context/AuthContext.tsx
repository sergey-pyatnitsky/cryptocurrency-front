import { createContext } from "react";

interface IContextProps {
  isAuth: boolean,
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext({} as IContextProps);