import { SyntheticEvent, useEffect, useState } from "react";

import Input from "../../components/UI/Input";
import CheckBox from "../../components/UI/CheckBox";
import InfoBagde from "../../components/UI/InfoBagde";
import Select from "../../components/UI/Select";
import { ICreateRoomForm } from "../../lib/functions/validate";
import { useAuthState, useToaster } from "../../store/store";
import Button from "../../components/Button";
import InputRange from "../../components/UI/InputRange";
import { useNavigate } from "react-router-dom";

import { FaInfo } from "react-icons/fa6";
import PasswordInput from "../../components/UI/PasswordInput";

interface ICreateGameForm {
  values: ICreateRoomForm;
  handleChange: (n: any, v: any) => void;
}

const CreateGameForm = ({ values, handleChange }: ICreateGameForm) => {
  console.log(values);
  const authState = useAuthState();
  const [loading, setLoading] = useState(false);
  const setToast = useToaster((s) => s.addToast);
  const navigate = useNavigate();

  const handleCreateGame = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!authState.user.id) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/create-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          buyIn: +values.buyIn,
          amountOfPlayers: values.amountOfPlayers || 2,
          prize: (values.amountOfPlayers || 2) * values.buyIn,
          isPrivate: values.isPrivate === undefined ? false : values.isPrivate,
          roomPassword: values.roomPassword || 0,
          autoStart: values.autoStart,
          creatorID: authState.user.id,
          mode: values.mode,
          prizeDestribution: values.prizeDestribution
        })
      });

      if (res.status === 200) {
        authState.addUserMoney(-+values.buyIn);

        setToast({
          type: "success",
          title: "Игра была успешно создана",
          subtitle: "С вашего счета было списано " + "$ " + values.buyIn
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setToast({
        type: "error",
        title: "Не удалось создать игру",
        subtitle: "Произошла ошибка при создании игры, попробуйте позже."
      });
    } finally {
      setLoading(false);
    }
  };

  const onCheckbox = (val: keyof ICreateRoomForm) => {
    if (values[val]) {
      handleChange(val, false);
    } else {
      handleChange(val, true);
    }
  };

  useEffect(() => {
    if (values.amountOfPlayers === 2) {
      handleChange("prizeDestribution", "winner takes all");
    }

    if (!values.isPrivate && values.roomPassword?.length > 0) {
      handleChange("roomPassword", "");
    }
  }, [values.amountOfPlayers, values.isPrivate]);

  console.log("values", values);

  return (
    <form
      onSubmit={handleCreateGame}
      className="flex-col  h-full overflow-y-auto w-full p-1 lg:w-1/2 flex gap-8"
    >
      <div>
        <label htmlFor="name" className="text-sm text-gray-10">
          Название
        </label>

        <Input
          value={values.name || ""}
          id="name"
          name="name"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="Sunday Million three hundred bucks GTD"
        />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-gray-10">Режим</span>
          <InfoBagde position="top-right">
            <p>Регуляр — блайнды меняются каждые 10 минут.</p>
            <p className="my-1">Турбо покер — каждые 5 минут.</p>
            <p>Гипер турбо — каждые 2 минуты.</p>
          </InfoBagde>
        </div>
        <Select
          options={[
            { title: "Регуляр", value: "regular" },
            { title: "Турбо", value: "turbo" },
            { title: "Гипер-Турбо", value: "hyperTurbo" }
          ]}
          name="mode"
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <label htmlFor="prizeDestribution" className="text-sm text-gray-10">
            Распределение призов
          </label>
          <InfoBagde>
            <p>Победитель забирает все - победитель получает все деньги.</p>
            <p className="my-1">
              The 50% rules - Победитель получает половину от суммы 500$, второй
              получит половину от оставшейся суммы - 250$, третье и четвертое
              место по - 125$
            </p>
          </InfoBagde>
        </div>
        <Select
          options={[
            { title: "Победитель забирает все", value: "winner takes all" },
            {
              title: "Правило 50%",
              value: "the 50% rules",
              disable: values.amountOfPlayers < 4 || !values.amountOfPlayers
            }
          ]}
          name="prizeDestribution"
          onChange={handleChange}
        />
      </div>

      <div className="w-full flex gap-2">
        <div className="w-1/2">
          <div className="flex items-center gap-2">
            <label htmlFor="buyIn" className="text-sm text-gray-10">
              Бай-ин
            </label>
            <InfoBagde position="top-right">
              <p>
                Сумма которую должен заплатить игрок, чтобы принять участие в
                игре.
              </p>
            </InfoBagde>
          </div>
          <Input
            placeholder="> 100"
            min={10}
            max={50000}
            type="number"
            value={values.buyIn || ""}
            name="buyIn"
            id="buyIn"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <div className="mt-6 w-full">
            <InputRange
              min={100}
              step={100}
              max={authState.user.money}
              name="buyIn"
              value={values.buyIn}
              onChange={(e) => handleChange(e.target.name, +e.target.value)}
            />
          </div>
        </div>
        <div className="w-1/2">
          <span className="text-sm text-gray-10">Кол-во игроков</span>
          <Select
            options={[
              { title: "2", value: 2 },
              { title: "3", value: 3 },
              { title: "4", value: 4 },
              { title: "5", value: 5 },
              { title: "6", value: 6 },
              { title: "7", value: 7 },
              { title: "8", value: 8 }
            ]}
            name="amountOfPlayers"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <CheckBox
          name="isPrivate"
          id="isPrivate"
          onChange={onCheckbox}
          label="Приватное лобби"
          checked={values.isPrivate}
        />
        <PasswordInput
          id="roomPassword"
          placeholder="Введите пароль для лобби"
          name="roomPassword"
          value={values.roomPassword || ""}
          type="password"
          disabled={!values.isPrivate}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </div>

      <div className="flex gap-2 text-gray-10">
        <FaInfo />
        <p className="text-sm ">
          Игра запустится автоматически, как только комната будет заполнена.
        </p>
      </div>

      <div>
        {" "}
        <Button
          type="submit"
          isLoading={loading}
          disabled={!values.name || !values.buyIn}
          className="w-full min-h-fit rounded text-white text-sm"
        >
          Создать игру
        </Button>
      </div>
    </form>
  );
};

export default CreateGameForm;
