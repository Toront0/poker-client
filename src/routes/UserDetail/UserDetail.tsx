import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import { MdOutlineModeEditOutline } from "react-icons/md";

import ChangeProfileImgModal from "../../components/Modals/ChangeProfileImgModal";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import UserDetailUsername from "./UserDetailUsername";
import { useAuthState } from "../../store/store";
import UserDetailNavigation from "./UserDetailNavigation";
import UserDetailGames from "./UserDetailGames";

interface IUserDetail {
  id: number;
  createdAt: Date;
  username: string;
  profileImg: string;
  bannerImg: string;
  isVip?: boolean;
}

const UserDetail = () => {
  const [expandModal, setExpandModal] = useState(false);
  const authState = useAuthState((state) => state.user);

  const data = useLoaderData() as IUserDetail;

  console.log(data);

  const formattedTime = new Intl.DateTimeFormat("ru", {
    dateStyle: "medium"
  }).format(new Date(data.createdAt));

  const canChangeProfileImg = () => {
    if (authState.id === data.id) {
      setExpandModal(true);
    }
  };

  return (
    <MainLayout>
      <div className="w-full relative h-full ">
        {expandModal && (
          <ChangeProfileImgModal onClose={() => setExpandModal(false)} />
        )}
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            src={data.bannerImg}
            alt={data.username}
            className="w-full h-full select-none object-cover brightness-[.3]"
          />
        </div>
        <div className="top-1/2 [width:clamp(300px,90%,600px)] z-10 -translate-y-1/2 left-1/2 -translate-x-1/2 md:left-12 md:-translate-x-0  rounded bg-opac-b-8 border border-opac-w-2 absolute p-4">
          <div className="flex items-center gap-2">
            <div
              onClick={canChangeProfileImg}
              className={`min-w-[80px]  h-20 ${
                authState.id === data.id ? "group cursor-pointer" : ""
              } ${data.isVip ? "gold" : ""} rounded-full p-0.5  relative`}
            >
              {authState.id === data.id && (
                <div className=" absolute top-1/2 group-hover:flex -translate-y-1/2 left-1/2 z-20 -translate-x-1/2 h-fit text-white px-1.5 rounded tracking-wider font-extrabold text-2xl hidden items-center">
                  <MdOutlineModeEditOutline />
                </div>
              )}

              <div className="w-full bg-black rounded-full h-full">
                <img
                  src={
                    authState.id === data.id
                      ? authState.profileImg
                      : data.profileImg
                  }
                  alt={data.username}
                  className="w-full h-full rounded-full group-hover:brightness-50 object-cover"
                />
              </div>
            </div>
            <div className="text-[13px]">
              <UserDetailUsername username={data.username} userId={data.id} />
              <span className=" text-gray-10 block">
                Аккаунт создан {formattedTime}
              </span>
            </div>
          </div>
          <UserDetailNavigation userId={data.id} />
          <UserDetailGames />
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDetail;

export const loader = async (params: LoaderFunctionArgs) => {
  const { slug } = params.params;

  const res = await fetch(
    `https://${import.meta.env.VITE_BACKEND_ORIGIN}/user/${slug}`
  );

  const data = await res.json();

  return data;
};
