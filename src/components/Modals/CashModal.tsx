import { useState, useEffect, useRef } from "react";

import Button from "../Button";

import ModalPortal from "./ModalPortal";
import { useAuthState } from "../../store/store";
import { formatTimeDuration } from "../../lib/utils";
import ModalContainer from "./ModalContainer";
import ModalHeader from "./ModalHeader";

interface ICashModal {
  onClose: () => void;
}

const CashModal = ({ onClose }: ICashModal) => {
  const authState = useAuthState();
  const [seconds, setSeconds] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const timerRef = useRef<number>();

  useEffect(() => {
    const getLastMoneyStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/money-status/${authState.user.id}`
        );

        const data = await res.json();

        console.log(new Date(data).toISOString());
        console.log(new Date().toISOString());

        // setSeconds(secondsThen + 14400 - secondsNow);
        setSeconds(
          new Date(data).getTime() / 1000 + 14400 - new Date().getTime() / 1000
        );
      } catch (error) {
        console.error(error);
      } finally {
        setInitialLoading(false);
      }
    };

    getLastMoneyStatus();
  }, []);

  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setSeconds((p) => p - 1);
      }, 1000);

      return () => {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      };
    }
  }, []);

  const getFreeMoney = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/get-money/${authState.user.id}`
      );

      if (res.status === 200) {
        authState.addUserMoney(10000);
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalPortal onClose={onClose}>
      <ModalContainer>
        <ModalHeader onClose={onClose} title="КАССА" />
        <div className="p-4">
          <p className="text-sm text-gray-12">
            Вы можете взять бесплатные фишки каждые 4 часа
          </p>
          {seconds > 0 && (
            <p className="text-sm text-gray-12 mt-2">
              Вы можете получить $10.000 через{" "}
              <b>{formatTimeDuration(seconds)}</b>
            </p>
          )}

          <div onClick={getFreeMoney} className="mt-4">
            <Button
              isLoading={loading}
              disabled={seconds > 0 || initialLoading}
            >
              Получить $10.000
            </Button>
          </div>
        </div>
      </ModalContainer>
    </ModalPortal>
  );
};

export default CashModal;
