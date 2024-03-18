interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = ({ error, ...rest }: IInput) => {
  return (
    <input
      {...rest}
      autoComplete="off"
      className={`focus:outline-none transition-colors ${
        error
          ? "border-[#ff0000] shadow-glow-error"
          : "border-opac-w-1 focus:border-purple-8 focus:bg-black focus:shadow-input-glow"
      } text-sm text-gray-12 p-2 disabled:placeholder:text-gray-7 rounded bg-opac-w-1  border  w-full`}
    />
  );
};

export default Input;
