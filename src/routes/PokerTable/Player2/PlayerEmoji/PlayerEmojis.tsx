import emoji from "../../../../assets/emojies/emoji_1.png";
import emoji2 from "../../../../assets/emojies/emoji_2.png";
import emoji3 from "../../../../assets/emojies/emoji_10.png";

const PlayerEmojis = () => {
  return (
    <div className="absolute inset-0 z-50">
      <div className="w-6 md:w-8 xl:w-14 h-6 md:h-8 xl:h-14 emoji-picker rounded-full shadow-poker-card flex items-center justify-center bg-blue-4 border border-opac-w-2   absolute z-40 top-[calc(50%-28px)] left-[calc(50%-28px)]  ">
        <img src={emoji} alt="" className="w-[52px] h-[52px] object-contain" />
      </div>
      <div className="w-6 md:w-8 xl:w-14 h-6 md:h-8 xl:h-14 emoji-picker rounded-full shadow-poker-card flex items-center justify-center bg-blue-4 border border-opac-w-2   absolute z-40 top-[calc(50%-28px)] left-[calc(50%-28px)]  ">
        <img src={emoji2} alt="" className="w-[52px] h-[52px] object-contain" />
      </div>
      <div className="w-6 md:w-8 xl:w-14 h-6 md:h-8 xl:h-14 emoji-picker rounded-full shadow-poker-card flex items-center justify-center bg-blue-4 border border-opac-w-2   absolute z-40 top-[calc(50%-28px)] left-[calc(50%-28px)]  ">
        <img src={emoji3} alt="" className="w-[52px] h-[52px] object-contain" />
      </div>
    </div>
  );
};

export default PlayerEmojis;
