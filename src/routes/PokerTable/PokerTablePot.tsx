interface IPokerTablePot {
  pot: number;
}

const PokerTablePot = ({ pot }: IPokerTablePot) => {
  return (
    <div className="text-[9px] xl:text-sm text-gray-12 font-medium text-center">
      <span>Общий банк: </span>
      <span className="font-semibold">{pot}</span>
    </div>
  );
};

export default PokerTablePot;
