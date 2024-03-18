import { MdError } from "react-icons/md";

const WrongUsername = () => {
  return (
    <div className="w-full border mt-3 border-[#ff1616] rounded p-3 flex items-center gap-2">
      <MdError className="text-3xl text-[#ff1616]" />
      <div>
        <span className="text-sm text-white font-semibold">
          Аккаунт с таким никнеймом не существует
        </span>
      </div>
    </div>
  );
};

export default WrongUsername;
