import EmptySeat from "../../components/EmptySeat";
import { useForm } from "../../lib/hooks/useForm";
import { ICreateRoomForm } from "../../lib/functions/validate";
import CreateGameForm from "./CreateGameForm";

import table from "../../assets/table_main.png";
import GamesLayout from "../../layouts/GamesLayout";

const CreateGame = () => {
  const { values, handleChange } = useForm<ICreateRoomForm>();

  return (
    <GamesLayout>
      <div className="w-full h-[calc(100%-40px)] max-w-[2000px]  mx-auto flex gap-24  lg:justify-center">
        <CreateGameForm values={values} handleChange={handleChange} />
        <div className="w-1/2 hidden lg:flex justify-center mt-24 drop-shadow-[0px_0px_20px_rgba(255,255,255,.05)] relative">
          <div>
            <div className="w-4/5 relative ">
              {Array.from({ length: values.amountOfPlayers || 2 }).map(
                (_, i) => (
                  <EmptySeat
                    key={i}
                    idx={i}
                    amountOfPlayers={values.amountOfPlayers || 2}
                  />
                )
              )}
              <img src={table} alt="" className="w-full table-shadow-xs" />
            </div>
          </div>
        </div>
      </div>
    </GamesLayout>
  );
};

export default CreateGame;
