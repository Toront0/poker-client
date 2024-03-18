import { useState } from "react";
import VerifyEmail from "./VerifyEmail";

import ConfirmCode from "./ConfirmCode";
import NewPassword from "./NewPassword";

import { FaCheck } from "react-icons/fa6";

export type ChangePasswordSteps = 1 | 2 | 3;

interface IMultiForm {
  onClose: () => void;
}

const MultiForm = ({ onClose }: IMultiForm) => {
  const [activeStep, setActiveStep] = useState<ChangePasswordSteps>(1);
  const [email, setEmail] = useState("");

  return (
    <>
      {" "}
      <div className="flex items-center px-1 md:px-6 justify-between">
        <div className="flex flex-col items-center justify-center">
          <div
            className={`w-16 h-16 text-xl ${
              activeStep > 1 ? "bg-blue-7" : ""
            } font-bold  text-white rounded-full border-4 border-blue-7 flex items-center justify-center`}
          >
            {activeStep > 1 ? <FaCheck /> : 1}
          </div>
          <span className="text-[10px] md:text-sm text-gray-12 font-medium">
            Укажите почту
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div
            className={`w-16 h-16 text-xl ${
              activeStep > 2 ? "bg-blue-7" : ""
            } font-bold  text-white rounded-full border-4 border-blue-7 flex items-center justify-center`}
          >
            {activeStep > 2 ? <FaCheck /> : 2}
          </div>
          <span className="text-[10px] md:text-sm text-gray-12 font-medium">
            Подтвердите код
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 text-xl font-bold  text-white rounded-full border-4 border-blue-7 flex items-center justify-center">
            <span>3</span>
          </div>
          <span className="text-[10px] md:text-sm text-gray-12 font-medium">
            Новый пароль
          </span>
        </div>
      </div>
      <form className="mt-8">
        {activeStep === 1 ? (
          <VerifyEmail
            email={email}
            setEmail={setEmail}
            setActiveStep={setActiveStep}
            onClose={onClose}
          />
        ) : activeStep === 2 ? (
          <ConfirmCode
            setActiveStep={setActiveStep}
            email={email}
            onClose={onClose}
          />
        ) : (
          <NewPassword onClose={onClose} />
        )}
      </form>
    </>
  );
};

export default MultiForm;
