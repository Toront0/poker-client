import WinnerAnimation from "../../../components/Icons/WinnerAnimation";

interface IPlayerImage {
  img: string;
  winners: number[];
  playerIdx: number;
  id: number;
  authUser?: boolean;
}
const PlayerImage = ({ img, winners, id }: IPlayerImage) => {
  return (
    <div className="w-full -mb-6 xl:-mb-8 flex justify-center relative ">
      <div className="-z-10 p-px xl:p-1 silver  w-12 lg:w-16 xl:w-20 2xl:w-28  aspect-square rounded-full ">
        <div className="w-full h-full rounded-full border xl:border-2 relative  border-black">
          <img
            src={img}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
          {winners.includes(id) && <WinnerAnimation />}
        </div>
      </div>
    </div>
  );
};

export default PlayerImage;
