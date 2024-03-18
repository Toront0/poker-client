import React, { useEffect, useRef, useState } from "react";

interface IPlayerEmoji {
  emoji?: string;
}

const PlayerEmoji = ({ emoji }: IPlayerEmoji) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const timerRef = useRef<number>();
  const emojiRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (emoji !== undefined) {
      setShowEmoji(true);
    }

    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        setShowEmoji(false);
      }, 3000);

      return () => {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
        setShowEmoji(false);
      };
    }

    return () => {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
      setShowEmoji(false);
    };
  }, [emoji]);

  console.log("showEmoji", showEmoji);

  return (
    <>
      {showEmoji && (
        <img
          src={emoji}
          ref={emojiRef as React.RefObject<HTMLImageElement>}
          alt="Emoji "
          className=" drop-shadow-emoji w-full h-full object-contain "
        />
      )}
    </>
  );
};

export default PlayerEmoji;
