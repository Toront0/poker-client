import {
  ISignUpForm,
  validateSignUpForm
} from "../../../lib/functions/validate";
import { useForm } from "../../../lib/hooks/useForm";
import Input from "../../UI/Input";
import ModalPortal from "../ModalPortal";

import { MdErrorOutline } from "react-icons/md";

import { useAuthState } from "../../../store/store";
import { SyntheticEvent, useEffect, useState } from "react";

import Button from "../../Button";
import ModalContainer from "../ModalContainer";
import ModalHeader from "../ModalHeader";

interface ISignUpModal {
  onClose: () => void;
}

const SignUpModal = ({ onClose }: ISignUpModal) => {
  const { values, errors, handleChange } =
    useForm<ISignUpForm>(validateSignUpForm);
  const [doesEmailExist, setDoesEmailExist] = useState(false);
  const [doesUsernameExist, setDoesUsernameExist] = useState(false);

  const authState = useAuthState();

  const handleSignUp = (e: SyntheticEvent) => {
    e.preventDefault();

    authState.signUp(values.username, values.email, values.password);
  };

  useEffect(() => {
    const handler = async () => {
      const res = await authState.doesEmailExist(values.email);
      if (res) {
        setDoesEmailExist(true);
      } else {
        setDoesEmailExist(false);
      }
    };

    if (values.email?.length > 1 && !errors.email) {
      handler();
    }
  }, [values.email, errors.email]);

  useEffect(() => {
    const handler = async () => {
      const res = await authState.doesUsernameExist(values.username);
      if (res) {
        setDoesUsernameExist(true);
      } else {
        setDoesUsernameExist(false);
      }
    };

    if (values.username?.length > 1 && !errors.username) {
      handler();
    }
  }, [values.username, errors.username]);

  return (
    <ModalPortal onClose={onClose}>
      <ModalContainer>
        <ModalHeader onClose={onClose} title="РЕГИСТРАЦИЯ" />
        <form className="p-4">
          <div>
            <div className="flex items-center mb-1 justify-between">
              <label
                htmlFor="email"
                className="text-sm text-gray-12 font-semibold inline-block"
              >
                Электронная почта
              </label>
              {errors.email && (
                <MdErrorOutline className="text-lg text-[#ff0000]" />
              )}
            </div>
            <Input
              placeholder="ivanzolo@mail.com"
              id="email"
              name="email"
              error={!!errors.email || doesEmailExist}
              autoComplete="off"
              value={values.email || ""}
              onChange={(e) =>
                handleChange(e.target.name as keyof ISignUpForm, e.target.value)
              }
            />
            {errors.email && (
              <p className="text-sm text-[#f85a5a] font-medium">
                {errors.email}
              </p>
            )}
            {!errors.email && doesEmailExist && (
              <p className="text-sm text-[#f85a5a] font-medium">
                Аккаунт с такой почтой уже существует.
              </p>
            )}
          </div>
          <div className="my-2">
            <div className="flex items-center mb-1 justify-between">
              <label
                htmlFor="username"
                className="text-sm text-gray-12 font-semibold inline-block"
              >
                Никнейм
              </label>
              {errors.username && (
                <MdErrorOutline className="text-lg text-[#ff0000]" />
              )}
            </div>
            <Input
              placeholder="ivanzolo"
              id="username"
              name="username"
              error={!!errors.username || doesUsernameExist}
              autoComplete="off"
              value={values.username || ""}
              onChange={(e) =>
                handleChange(e.target.name as keyof ISignUpForm, e.target.value)
              }
            />
            {errors.username && (
              <p className="text-sm text-[#f85a5a] font-medium">
                {errors.username}
              </p>
            )}
            {!errors.username && doesUsernameExist && (
              <p className="text-sm text-[#f85a5a] font-medium">
                Такой никнейм уже занят. Выберите другой.
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center mb-1 justify-between">
              <label
                htmlFor="password"
                className="text-sm text-gray-12 font-semibold inline-block"
              >
                Пароль
              </label>
              {errors.password && (
                <MdErrorOutline className="text-lg text-[#ff0000]" />
              )}
            </div>
            <Input
              type="password"
              placeholder="********"
              id="password"
              name="password"
              error={!!errors.password}
              autoComplete="off"
              value={values.password || ""}
              onChange={(e) =>
                handleChange(e.target.name as keyof ISignUpForm, e.target.value)
              }
            />
            {errors.password && (
              <p className="text-sm text-[#f85a5a] font-medium">
                {errors.password}
              </p>
            )}
          </div>
          <div className="mt-2">
            <div className="flex items-center mb-1 justify-between">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-gray-12 font-semibold inline-block"
              >
                Подтвердите пароль
              </label>
              {errors.confirmPassword && (
                <MdErrorOutline className="text-lg text-[#ff0000]" />
              )}
            </div>
            <Input
              type="password"
              placeholder="********"
              id="confirmPassword"
              name="confirmPassword"
              error={!!errors.confirmPassword}
              autoComplete="off"
              value={values.confirmPassword || ""}
              onChange={(e) =>
                handleChange(e.target.name as keyof ISignUpForm, e.target.value)
              }
            />
            {errors.confirmPassword && (
              <p className="text-sm text-[#f85a5a] font-medium">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </form>
        <div className="flex items-center justify-end gap-2 p-4">
          <Button onClick={onClose} variant="secondary">
            Закрыть
          </Button>
          <Button
            disabled={
              Object.values(values).length < 4 ||
              Object.values(errors).length >= 1
            }
            onClick={handleSignUp}
          >
            Зарегистрироваться
          </Button>
        </div>
      </ModalContainer>
    </ModalPortal>
  );
};

export default SignUpModal;
