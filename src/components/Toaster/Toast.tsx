import { useState, useEffect, useRef } from "react";
import { ToastType } from "../../store/types";
import { useToaster } from "../../store/store";

const Toast = ({
  title,
  id,
  subtitle,
  type = "info",
  onToastFinish
}: ToastType) => {
  const ref = useRef<number>();
  const [seconds, setSeconds] = useState(5);
  const deleteToast = useToaster((s) => s.deleteToast);

  useEffect(() => {
    if (!ref.current) {
      ref.current = setInterval(() => {
        setSeconds((p) => p - 1);
      }, 1000);

      if (seconds <= 0) {
        onToastFinish && onToastFinish();

        deleteToast(id);
      }
    }

    return () => {
      clearInterval(ref.current);
      ref.current = undefined;
    };
  }, [seconds]);

  const variantType = () => {
    if (type === "info") {
      return "#15052e";
    }

    if (type === "error") {
      return "#570d0d";
    }

    if (type === "success") {
      return "#242906";
    }
  };

  return (
    <div
      onClick={() => deleteToast(id)}
      className="w-72 md:w-96 relative overflow-hidden cursor-pointer rounded border border-opac-w-2"
    >
      <div className="absolute w-full  h-full">
        <div className="absolute z-10 bg-gradient-to-r from-blue-1 via-blue-2 to-transparent w-full  h-full"></div>
        <div className="relative flex w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: i % 2 === 0 ? "#040109" : variantType()
              }}
              className={`w-8 -rotate-45 origin-top-left h-40 `}
            ></div>
          ))}
        </div>
      </div>
      <div className="p-3 md:p-4 flex relative z-20 items-center gap-2">
        <div
          style={{ borderColor: variantType() }}
          className={`min-w-[48px] relative h-12 border-[3px] rounded-full flex items-center justify-center text-white font-bold`}
        >
          <span className="absolute animate-ping text-sm">{seconds}</span>
          {seconds}
        </div>
        <div className="flex flex-col break-words">
          <span className="text-sm text-gray-12 font-semibold">{title}</span>
          <span className="text-xs text-gray-12">{subtitle}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
