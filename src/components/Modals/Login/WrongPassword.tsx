import { MdError } from "react-icons/md";

const WrongPassword = () => {
  return (
    <div className="w-full border mt-3 border-[#ff1616] rounded p-3 flex items-center gap-2">
      <MdError className="text-3xl text-[#ff1616]" />
      <div>
        <span className="text-sm text-white font-semibold">
          Неправильный пароль. Попробуйте еще раз
        </span>
      </div>
    </div>
  );
};

export default WrongPassword;
