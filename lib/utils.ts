import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleInputChange<T>(
  e: React.ChangeEvent<any>,
  setValues: React.Dispatch<React.SetStateAction<T>>
) {
  const { name, value, type, checked } = e.target;

  setValues((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
}
