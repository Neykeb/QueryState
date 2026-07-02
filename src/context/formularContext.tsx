// context/FormularContext.tsx
import { createContext, useState } from "react";

// 1. Erst den Typ definieren
type FormularContextType = {
  formData: {
    username: string;
    email: string;
  };
  setFormData: (data: { username: string; email: string }) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// 2. Dann createContext mit diesem Typ füttern
export const FormularContext = createContext<FormularContextType | null>(null);

export function FormularProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const value: FormularContextType = {
    formData,
    setFormData,
    handleChange,
  };

  return <FormularContext value={value}>{children}</FormularContext>;
}
