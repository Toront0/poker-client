const GamesSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="w-full h-9 my-1 bg-opac-w-2 animate-pulse"
        ></div>
      ))}
    </>
  );
};

export default GamesSkeleton;
