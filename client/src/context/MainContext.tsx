import { createContext, useContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

type MainContextTypes = {
  error: any;
  message: string;
  loading: boolean;
  setError: Dispatch<SetStateAction<any>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const MainContext = createContext({} as MainContextTypes);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<any>({});
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <MainContext.Provider value={{ loading, setLoading, message, setMessage, error, setError }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
