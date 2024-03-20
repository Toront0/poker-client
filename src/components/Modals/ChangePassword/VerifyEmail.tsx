import {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  SyntheticEvent
} from "react";

import Button from "../../Button";
import Input from "../../UI/Input";
import { ChangePasswordSteps } from "./MultiForm";

interface IVerifyEmail {
  email: string;
  setEmail: (v: string) => void;
  setActiveStep: Dispatch<SetStateAction<ChangePasswordSteps>>;
  onClose: () => void;
}

const VerifyEmail = ({
  email,
  setEmail,
  setActiveStep,
  onClose
}: IVerifyEmail) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError("");
    }

    setEmail(e.target.value);
  };

  const onNextStep = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Введите корректный адрес почты.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(
        `https://${import.meta.env.VITE_BACKEND_ORIGIN}/check-email/${email}`
      );

      if (res.status === 400) {
        const res = await fetch(
          `https://${
            import.meta.env.VITE_BACKEND_ORIGIN
          }/send-email-code/${email}`
        );
        if (res.ok) {
          setActiveStep(2);
        }
      }

      if (res.status === 200) {
        setError("Аккаунт с такой почтой не существует");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="text-[8px] md:text-xs text-gray-9">
        Укажите привязанную почту к вашему аккаунту. Мы отправим код для
        проверки, чтобы верифицировать вашу личность. После вы сможете сбросить
        пароль и создать новый.
      </p>
      <div className="mt-2">
        <Input
          placeholder="Email вашего аккаунта"
          value={email}
          onChange={onChange}
          error={!!error}
        />
        {error && <p className="text-sm text-[#f85a5a] font-medium">{error}</p>}
      </div>
      <div className="flex mt-4 gap-2">
        <Button variant="secondary" onClick={onClose}>
          Отменить
        </Button>
        <Button onClick={onNextStep} isLoading={isLoading}>
          Дальше
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
