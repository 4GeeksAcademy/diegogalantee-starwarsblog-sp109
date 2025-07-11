
import React, { useContext, useReducer, createContext } from "react"; 
import storeReducer, { initialStore } from "../store"; 
const StoreContext = createContext()


export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());


  React.useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}


export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}