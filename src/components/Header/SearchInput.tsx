import { useState, useEffect } from "react";

import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDebouncedValue } from "../../lib/hooks/useDebouncedValue";
import LoadSpinner from "../UI/LoadSpinner";

import { TbArrowsVertical } from "react-icons/tb";

type FoundResults = {
  id: number;
  name?: string;
  username?: string;
  prize?: number;
  state?: string;
  profileImg?: string;
};

const searchCategories = ["Игры", "Пользователи"];

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<FoundResults[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounced] = useDebouncedValue(inputValue, 200);
  const [category, setCategory] = useState(0);

  useEffect(() => {
    if (inputValue.length >= 1) {
      const handler = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://${import.meta.env.VITE_BACKEND_ORIGIN}/find-${
              category === 0 ? "game" : "user"
            }?search=${inputValue}`
          );

          const data = await res.json();

          setResult(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      handler();
    } else {
      setInputValue("");
      setResult([]);
    }
  }, [debounced, category]);

  return (
    <div
      className={`relative hidden md:block p-1 ${
        inputValue.length >= 1 ? "bg-gray-1" : "bg-transparent"
      } rounded-t`}
    >
      <div
        // onClick={toggleInput}
        className={`flex items-center h-9 px-3 border ${
          isFocused ? "border-purple-8" : "border-opac-w-1"
        } gap-2 md:w-96 xl:w-[500px] rounded-full text-gray-12 bg-opac-w-2`}
      >
        <div>
          <IoSearch className="text-xl" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          className="w-full bg-transparent focus:outline-none h-full text-sm text-gray-12"
          placeholder="Поиск..."
        />
        <button
          onClick={() =>
            setCategory((p) => (p + 1 >= searchCategories.length ? 0 : p + 1))
          }
          className="px-3 flex items-center gap-1 py-1 rounded-full bg-opac-w-1 text-xs text-gray-10 font-medium"
        >
          {searchCategories[category]}
          <TbArrowsVertical />
        </button>
      </div>
      {inputValue.length >= 1 && (
        <div className="absolute overflow-y-auto top-full rounded-b z-20 left-0 p-2 bg-gray-1 w-full max-h-[250px]">
          {result.length > 0 ? (
            <>
              {result.map((v) => (
                <Link
                  key={v.id}
                  to={`/${v.id}`}
                  onClick={() => setInputValue("")}
                  className="flex items-center justify-between  mb-2 hover:bg-opac-w-1  rounded px-2 py-1.5"
                >
                  <div className="flex items-center gap-2">
                    {v.profileImg && (
                      <div className="w-10 h-10 rounded-full ">
                        <img
                          src={v.profileImg}
                          alt={v.username}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    )}
                    <div className="text-sm text-white font-medium">
                      <span>{v.name || v.username}</span>
                      {v.prize && (
                        <h5 className="font-normal text-xs">${v.prize}</h5>
                      )}
                    </div>
                  </div>
                  {v.state && (
                    <div className="flex items-center rounded-full bg-black px-4 border border-opac-w-3 py-1.5 gap-2 text-xs font-medium text-gray-12">
                      {v.state}
                      <div
                        className={`w-2.5 h-2.5 rounded-full relative ${
                          v.state === "Регистрация"
                            ? "bg-[#2bf819]"
                            : v.state === "Идет"
                            ? "bg-[#f00]"
                            : "bg-blue-3"
                        }`}
                      >
                        <div
                          style={{ backgroundColor: "inherit" }}
                          className={`w-2.5 h-2.5 rounded-full absolute ${
                            v.state !== "Завершен" && "animate-ping"
                          }`}
                        ></div>
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </>
          ) : (
            <>
              {isLoading ? (
                <div className="flex items-center gap-2 justify-center py-2 text-sm text-gray-12">
                  <LoadSpinner size="sm" />
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center py-2 text-sm text-gray-12">
                  <span className="">Ничего не найдено</span>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
