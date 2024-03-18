import { useRef, useEffect, useState } from "react";

const ButtonLoading = () => {
  const ref = useRef<HTMLDivElement>();
  const [dummy, setDummy] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setDummy(ref.current.offsetWidth);
    }
  }, [ref.current]);

  console.log(dummy);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ animationDuration: dummy / 80 + "s" }}
      className="flex absolute flex-nowrap infinite-scroll -left-9 min-w-full w-fit h-full"
    >
      {Array.from({ length: dummy / 16 }).map((_, i) => (
        <div
          key={i}
          className={`w-4 -rotate-45 origin-top-left h-20 ${
            i % 2 === 0 ? "bg-blue-6" : "bg-blue-5"
          }`}
        ></div>
      ))}
      {Array.from({ length: dummy / 16 }).map((_, i) => (
        <div
          key={i}
          className={`w-4 -rotate-45 origin-top-left h-20 ${
            i % 2 === 0 ? "bg-blue-6" : "bg-blue-5"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ButtonLoading;
