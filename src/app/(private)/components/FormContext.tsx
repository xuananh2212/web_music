// FormContext.tsx
import React, { createContext, useContext } from "react";
import { FormType } from "./table-master";

interface FormContextProps {
  type: FormType;
  idRow?: Record<string, any>;
  selectedAction: boolean;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ context: FormContextProps; children: React.ReactNode }> = ({
  context,
  children,
}) => {
  return <FormContext.Provider value={context}>{children}</FormContext.Provider>;
};

export const useFormContext = (): FormContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
