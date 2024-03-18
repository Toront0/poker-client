interface IInputRange extends React.InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
  value: number;
}

const InputRange = ({ min, max, value, ...rest }: IInputRange) => {
  return (
    <div className="w-full  h-1 cursor-pointer bg-opac-w-1 rounded relative">
      <input
        type="range"
        min={min}
        max={max}
        {...rest}
        className="absolute w-full peer inset-0 z-20 cursor-pointer appearance-none opacity-0"
      />
      <div className="w-[calc(100%-20px)] relative h-full">
        <div
          style={{
            left: (value / max) * 100 + "%"
          }}
          className="w-5 h-5 p-px rounded-full z-10 cursor-pointer  bg-gradient-to-t from-blue-5 via-blue-7 to-blue-10  flex items-center justify-center absolute top-1/2 -translate-y-1/2 "
        >
          <div className="w-full h-full rounded-full bg-blue-12">
            <div className="w-full h-full rounded-full bg-blue-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputRange;
