import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent
} from "react";
import Button from "../../Button";

interface IConfirmCode {
  email: string;
  setActiveStep: Dispatch<SetStateAction<1 | 2 | 3>>;
  onClose: () => void;
}

const ConfirmCode = ({ email, setActiveStep, onClose }: IConfirmCode) => {
  const [code, setCode] = useState("");
  const [isCodeCorrect, setIsCodeCorrect] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const handleInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (!isCodeCorrect) {
      setIsCodeCorrect(null);
    }

    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    const newCode = [];

    for (let i = 0; i < code.length; i++) {
      newCode.push(code[i]);
    }

    // const newCode = [...code];

    if (/^[a-z]+$/.test(e.target.value)) {
      const uc = e.target.value.toUpperCase();
      newCode[index] = uc;

      if (inputRefs[index].current) {
        inputRefs[index].current!.value = uc;
      }
    } else {
      newCode[index] = e.target.value;
    }
    setCode(newCode.join(""));

    e.target.select();

    if (e.target.value === "") {
      if (previousInput) {
        previousInput.current?.focus();
      }
    } else if (nextInput) {
      nextInput.current?.select();
    }
  };

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    const input = e.currentTarget;
    const previousInput = inputRefs[index - 1];

    if ((e.keyCode === 8 || e.keyCode === 46) && input.value === "") {
      e.preventDefault();
      setCode(
        (prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1)
      );
      if (previousInput) {
        previousInput.current?.focus();
      }
    }
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://${import.meta.env.VITE_BACKEND_ORIGIN}/verify-email-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: code,
            email: email
          })
        }
      );

      console.log("res", res);

      if (res.status === 200) {
        setActiveStep(3);
      }

      if (res.status === 400) {
        setIsCodeCorrect(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(code);

  return (
    <>
      <p className="text-xs text-gray-9 ">
        Мы отправили код верификации на вашу почту.
      </p>
      <p className="text-xs mt-1 text-gray-9 ">
        *Вы можете проверить свою почту на наличие кода, но возможно вы его не
        получите т.к. это тестовый проект и некоторые сторонние сервисы
        используются в бесплатном тарифе, и возможно лимит на отправку писем
        превышен. <br /> В таком случае можете использовать универсальный код -
        1-1-1-1-1-1.
      </p>
      <div className="flex gap-2 my-8 justify-center">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            className={`w-14 h-14 ${
              isCodeCorrect === null && isCodeCorrect !== false
                ? "border-opac-w-1"
                : "border-[#ff0000]"
            } border transition-colors  focus:outline-none focus:shadow-[0_0px_5px_rgba(119,44,232,1)] rounded focus:bg-black focus:border-blue-8 flex items-center justify-center text-white text-2xl text-center bg-opac-w-1`}
            key={index}
            type="text"
            maxLength={1}
            onChange={(e) => handleInput(e, index)}
            ref={inputRefs[index]}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      {isCodeCorrect === false && (
        <p className="text-sm text-[#e15555] text-center">Код неверен</p>
      )}
      <div className="flex mt-4 gap-2">
        <Button variant="secondary" onClick={onClose}>
          Отменить
        </Button>
        <Button onClick={onSubmit} isLoading={isLoading}>
          Дальше
        </Button>
      </div>
    </>
  );
};

export default ConfirmCode;
