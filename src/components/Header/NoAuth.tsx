import { useState } from "react";
import SignUpModal from "../Modals/SignUp/SignUpModal";
import LoginModal from "../Modals/Login/LoginModal";

const NoAuth = () => {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <div className="flex gap-2">
      {openSignUpModal && (
        <SignUpModal onClose={() => setOpenSignUpModal(false)} />
      )}
      {openLoginModal && (
        <LoginModal onClose={() => setOpenLoginModal(false)} />
      )}
      <button
        onClick={() => setOpenLoginModal(true)}
        className=" px-4 py-1 hover:bg-opac-w-1 rounded-full font-medium text-sm text-gray-12"
      >
        Войти
      </button>
      <button
        onClick={() => setOpenSignUpModal(true)}
        className="bg-purple-7 px-4 py-1 rounded-full hover:bg-purple-8 font-semibold text-sm text-gray-12"
      >
        Регистрация
      </button>
    </div>
  );
};

export default NoAuth;
