import { formatTime } from "../../lib/utils";

interface IAlreadySubscribed {
  finishedAt: Date;
}

const AlreadySubscribed = ({ finishedAt }: IAlreadySubscribed) => {
  return (
    <div className="flex items-center h-full  justify-center flex-col">
      <div className="flex items-center p-8 bg-purple-2 rounded justify-center flex-col">
        <h3 className="text-xl font-bold text-white">
          Вы являетесь VIP - подписчиком
        </h3>
        <h4 className="text-sm text-white">
          Ваша подписка закончится {formatTime(finishedAt)}
        </h4>
      </div>
    </div>
  );
};

export default AlreadySubscribed;
