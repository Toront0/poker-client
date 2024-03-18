import { useRef, useEffect } from "react";

export const useOutsideClick = (cb: () => void) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const handler = (e: any) => {
      if (
        e.target.hasAttribute("data-ignore-outside-clicks") ||
        !document.body.contains(e.target)
      ) {
        return;
      }

      if (ref.current && !ref.current?.contains(e.target)) {
        cb();
      }
    };

    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, [cb, ref]);

  return ref;
};
