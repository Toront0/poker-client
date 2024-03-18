import { useState, useEffect } from "react";

export const useForm = <T>(validate?: (v: T) => T) => {
  const [values, setValues] = useState({} as T);
  const [errors, setErrors] = useState({} as T);

  useEffect(() => {
    if (validate) setErrors(validate(values));
  }, [values]);
  // eslint-disable-next-line
  const handleChange = (name: keyof T, value: any) => {
    setValues((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  return { values, errors, handleChange };
};
