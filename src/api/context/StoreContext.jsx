import { createContext, useContext } from "react";
import { rootStore } from "../stores/RootStore";

const StoreContext = createContext(rootStore);

export function StoreProvider({ children }) {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
}

export function useStores() {
  return useContext(StoreContext);
}
