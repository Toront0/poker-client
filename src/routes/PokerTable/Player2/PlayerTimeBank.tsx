import { useState, useRef, useEffect } from "react";

interface IPlayerTimeBank {
  time_bank: number;
}

const PlayerTimeBank = ({ time_bank }: IPlayerTimeBank) => {
  const [secs, setSecs] = useState(time_bank);
  const timeRef = useRef<number>();

  useEffect(() => {
    if (time_bank <= 0 || secs <= 0) {
      return () => {
        clearInterval(timeRef.current);
        timeRef.current = undefined;
      };
    }
    if (!timeRef.current) {
      const id = setInterval(() => {
        setSecs((prev) => prev - 1);
      }, 1000);
      timeRef.current = id;

      return () => {
        clearInterval(timeRef.current);
        timeRef.current = undefined;
      };
    }
  }, [secs]);

  return (
    <div className=" w-full  flex h-1/2 absolute bg-gray-1  justify-center  items-center  z-20 leading-none text-[8px] lg:text-xs 2xl:text-base font-semibold text-white">
      Time {secs} sec
    </div>
  );
};

export default PlayerTimeBank;
