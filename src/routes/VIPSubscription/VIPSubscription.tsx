import MainLayout from "../../layouts/MainLayout";

import SubscribeOption from "./SubscribeOption";
import AlreadySubscribed from "./AlreadySubscribed";
import { useAuthState } from "../../store/store";

const VIPSubscription = () => {
  const authState = useAuthState((s) => s.user);

  return (
    <MainLayout>
      <div className="w-full h-full overflow-y-auto">
        <div className="px-2 py-8 h-full max-w-[1140px] mx-auto">
          {authState.vipFinishedAt ? (
            <AlreadySubscribed finishedAt={authState.vipFinishedAt} />
          ) : (
            <>
              <h3 className="text-base md:text-xl text-center text-gray-15 font-bold">
                Выберите план
              </h3>
              <p className="text-xs md:text-sm text-gray-10 text-center">
                Оформите VIP Подписку и получите доступ к эксклюзивному
                контенту.
              </p>
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <SubscribeOption
                  option="CORE"
                  price={50}
                  subscribeDate="month"
                  options={[
                    "Эксклюзивные аватарки",
                    "Эксклюзивные смайлики",
                    "Респект среди пацанов"
                  ]}
                />
                <SubscribeOption
                  option="= RESPECT ="
                  price={500}
                  subscribeDate="year"
                  options={[
                    "Эксклюзивные аватарки",
                    "Эксклюзивные смайлики",
                    "Респект среди пацанов"
                  ]}
                  isPremium
                />
                <SubscribeOption
                  option="PREMIUM"
                  price={250}
                  subscribeDate="6 month"
                  options={[
                    "Эксклюзивные аватарки",
                    "Эксклюзивные смайлики",
                    "Респект среди пацанов"
                  ]}
                />
              </section>
            </>
          )}
          {/*  */}
        </div>
      </div>
    </MainLayout>
  );
};

export default VIPSubscription;
