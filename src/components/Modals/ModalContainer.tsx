const ModalContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      className="[width:clamp(300px,90%,600px)]  min-h-fit max-h-[500px] overflow-y-auto rounded-xl overflow-hidden  bg-gradient-to-b from-purple-3 via-purple-2 to-purple-1  border-2 shadow-elev-2 flex flex-col  border-purple-3 "
    >
      {children}
    </div>
  );
};

export default ModalContainer;
