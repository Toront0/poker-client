const UserLoadingSkeleton = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="h-8 w-40 rounded-full bg-opac-w-1 animate-pulse"></div>
      <div className="w-9 h-9 rounded-full bg-opac-w-1 animate-pulse"></div>
    </div>
  );
};

export default UserLoadingSkeleton;
