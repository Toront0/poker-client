interface ITableInfo {
  name: string;
  ante: number;
  min_bet: number;
}

const TableInfo = ({ name, ante, min_bet }: ITableInfo) => {
  return (
    <div className="absolute flex gap-2 text-[9px] xl:text-xs text-gray-11 top-0 left-0 bg-black py-2 px-2">
      <h3>{name} - </h3>

      <div className="flex gap-1">
        <span>Blinds </span>
        <span>${min_bet / 2}</span>
        <span>/ ${min_bet}</span>
      </div>
      <div className="flex gap-1">
        <span>Ante </span>
        <span>${ante}</span>
      </div>
    </div>
  );
};

export default TableInfo;
