import CloseIcon from "../Icons/CloseIcon";

interface IModalHeader {
  onClose: () => void;
  title: string;
}

const ModalHeader = ({ onClose, title }: IModalHeader) => {
  return (
    <div className="min-h-[48px] md:min-h-[56px] px-3 relative bg-gradient-to-b from-purple-3 via-purple-2 to-purple-2 border-b-2 border-purple-2 flex items-center justify-between">
      <div></div>
      <div className="flex gap-4 h-full  items-center">
        <div className="w-2.5 h-2.5 rounded-full drop-shadow-[0_0px_4px_rgba(255,255,255,1)] bg-white"></div>
        <div className="h-full px-4 md:px-8 flex items-center">
          <h2
            style={{
              textShadow:
                "4px 0 #000, -4px 0 #000, 0 4px #000, 0 -4px #000,3px 3px #000, -3px -3px #000, 3px -3px #000, -3px 3px #000"
            }}
            className="text-xl md:text-2xl font-['Oswald'] font-bold  italic  text-gray-12 text-s"
          >
            {title}
          </h2>
        </div>
        <div className="w-2.5 h-2.5 rounded-full drop-shadow-[0_0px_4px_rgba(255,255,255,1)] bg-white"></div>
        <div className="w-2.5 h-2.5 rounded-full drop-shadow-[0_0px_4px_rgba(255,255,255,1)] "></div>
      </div>
      <div></div>
      <div className="h-full absolute top-0 right-2 flex items-center">
        <button onClick={onClose} className=" text-gray-12">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default ModalHeader;
