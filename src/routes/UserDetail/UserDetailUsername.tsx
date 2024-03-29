import { useState, SyntheticEvent } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import LoadSpinner from "../../components/UI/LoadSpinner";
import { useAuthState } from "../../store/store";

interface IUserDetailUsername {
  username: string;
  userId: number;
}

const UserDetailUsername = ({ username, userId }: IUserDetailUsername) => {
  const [editUsername, setEditUsername] = useState(false);
  const [inputValue, setInputValue] = useState(() => username);
  const [changingUsername, setChangingUsername] = useState(false);
  const authState = useAuthState();
  const [error, setError] = useState("");

  const handleChangeUsername = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setEditUsername(true);
      const res = await fetch(
        `https://${import.meta.env.VITE_BACKEND_ORIGIN}/change-username`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userID: authState.user.id,
            newValue: inputValue
          })
        }
      );

      authState.setUsernameLocally(inputValue);
      setEditUsername(false);

      if (res.status === 400) {
        throw new Error("Такой никнейм уже занят.");
      }
      // eslint-disable-next-line
    } catch (error: any) {
      setError(error.message);
    } finally {
      setChangingUsername(false);
    }
  };

  return (
    <div className="flex gap-2 items-center ">
      <div>
        {editUsername ? (
          <>
            <input
              type="text"
              id="username"
              name="username"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setError("");
              }}
              className={`bg-gray-2 w-48 border focus:outline-none ${
                error ? " border-[#f85a5a]" : "border-opac-w-1"
              } rounded-sm px-2 py-0.5 text-xl text-white font-bold`}
            />
            {(inputValue.length < 3 || inputValue.length > 14) && (
              <p className="text-xs text-[#f85a5a] font-medium">
                Имя пользователя должно содержать от 3 до 14 букв.
              </p>
            )}
            {error.length > 0 &&
              !(inputValue.length < 3 || inputValue.length > 14) && (
                <p className="text-xs text-[#f85a5a] font-medium">{error}</p>
              )}
          </>
        ) : (
          <span className="text-white text-xl font-bold block">
            {authState.user.id === userId ? authState.user.username : username}
          </span>
        )}
      </div>

      {authState.user.id === userId && (
        <>
          {editUsername ? (
            <form
              onSubmit={handleChangeUsername}
              className="flex items-center gap-1"
            >
              <button
                type="button"
                onClick={() => setEditUsername(false)}
                className="text-lg text-white bg-[#ff1818] px-0.5 py-0.5 rounded"
              >
                <IoMdClose />
              </button>
              <button
                disabled={
                  inputValue === username ||
                  inputValue.length < 3 ||
                  inputValue.length > 14 ||
                  changingUsername
                }
                type="submit"
                className="text-lg text-white disabled:bg-purple-4 disabled:text-gray-7 bg-purple-7 px-0.5 py-0.5 rounded"
              >
                {changingUsername ? (
                  <LoadSpinner size="sm" />
                ) : (
                  <IoMdCheckmark />
                )}
              </button>
            </form>
          ) : (
            <button
              onClick={() => setEditUsername(true)}
              className="text-lg text-gray-12 hover:bg-opac-w-1 px-0.5 py-0.5 rounded"
            >
              <MdOutlineModeEditOutline />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default UserDetailUsername;
