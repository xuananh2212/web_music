import { useContext } from "react";
import { TableBaseContext, TableBaseContextValue } from "../types";

const useTableContext = () => {
  const context = useContext(TableBaseContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};

export function useTableBaseContextSelector<T>(selector: (context: TableBaseContextValue) => T): T {
  const context = useContext(TableBaseContext);
  if (!context) {
    throw new Error("useTableBaseContextSelector must be used within a TableBaseProvider");
  }
  const selectedState = selector(context);
  return selectedState;
}

export default TableBaseContext;
