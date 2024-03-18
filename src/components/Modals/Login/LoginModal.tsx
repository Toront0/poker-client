import { ILoginForm } from "../../../lib/functions/validate";
import { useForm } from "../../../lib/hooks/useForm";
import Input from "../../UI/Input";
import ModalPortal from "../ModalPortal";

import WrongUsername from "./WrongUsername";
import WrongPassword from "./WrongPassword";
import { SyntheticEvent, useState } from "react";
import { useAuthState } from "../../../store/store";

import Button from "../../Button";
import ChangePassword from "../ChangePassword/ChangePassword";
import ModalContainer from "../ModalContainer";
import ModalHeader from "../ModalHeader";

interface ILoginModal {
  onClose: () => void;
}

const LoginModal = ({ onClose }: ILoginModal) => {
  const { values, handleChange } = useForm<ILoginForm>();
  const [loginResult, setLoginResult] = useState<
    "wrong-username" | "invalid-password" | undefined
  >(undefined);
  const login = useAuthState((state) => state.login);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await login(values.username, values.password);

      if (res === "invalid-password") {
        setLoginResult("invalid-password");
        return;
      }

      if (res === "wrong-username") {
        setLoginResult("wrong-username");
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {" "}
      {openChangePasswordModal && (
        <ChangePassword onClose={() => setOpenChangePasswordModal(false)} />
      )}
      <ModalPortal onClose={onClose}>
        <ModalContainer>
          <ModalHeader onClose={onClose} title="ВОЙТИ" />
          <div className="p-4 overflow-y-auto">
            {loginResult === "wrong-username" ? (
              <WrongUsername />
            ) : loginResult === "invalid-password" ? (
              <WrongPassword />
            ) : null}

            <form onSubmit={handleLogin} className="mt-6">
              <div>
                <label
                  htmlFor="username"
                  className="text-sm text-gray-12 font-semibold inline-block"
                >
                  Никнейм
                </label>
                <Input
                  placeholder="ivanzolo"
                  id="username"
                  name="username"
                  autoComplete="off"
                  value={values.username || ""}
                  onChange={(e) =>
                    handleChange(
                      e.target.name as keyof ILoginForm,
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm text-gray-12 font-semibold inline-block"
                >
                  Пароль
                </label>
                <Input
                  type="password"
                  placeholder="********"
                  id="password"
                  name="password"
                  autoComplete="off"
                  value={values.password || ""}
                  onChange={(e) =>
                    handleChange(
                      e.target.name as keyof ILoginForm,
                      e.target.value
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => setOpenChangePasswordModal(true)}
                  className="text-xs text-blue-10 hover:underline"
                >
                  Забыли пароль?
                </button>
              </div>
              <div className="mt-4">
                <Button
                  isLoading={isLoading}
                  disabled={isLoading || Object.values(values).length < 2}
                >
                  Войти
                </Button>
              </div>
            </form>
          </div>
        </ModalContainer>
      </ModalPortal>
    </>
  );
};

export default LoginModal;
