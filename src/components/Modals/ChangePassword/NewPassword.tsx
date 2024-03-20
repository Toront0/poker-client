import Input from "../../UI/Input";
import Button from "../../Button";
import { useForm } from "../../../lib/hooks/useForm";
import {
  IChangePassword,
  validateChangePassword
} from "../../../lib/functions/validate";
import { SyntheticEvent, useState } from "react";

interface INewPassword {
  onClose: () => void;
}

const NewPassword = ({ onClose }: INewPassword) => {
  const { values, errors, handleChange } = useForm<IChangePassword>(
    validateChangePassword
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch(
        `https://${import.meta.env.VITE_BACKEND_ORIGIN}/change-password/${
          values.password
        }`
      );

      if (res.status === 200) {
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="text-xs text-gray-9">
        Придумайте надежный пароль. И сохраните его в надежном месте, чтобы не
        забыть.
      </p>
      <div className="mt-2">
        <div>
          <label
            htmlFor="password"
            className="text-sm text-gray-12 font-semibold inline-block"
          >
            Новый пароль
          </label>
          <Input
            placeholder="Email вашего аккаунта"
            id="password"
            name="password"
            type="password"
            value={values.password || ""}
            error={!!errors.password}
            onChange={(e) =>
              handleChange(
                e.target.name as keyof IChangePassword,
                e.target.value
              )
            }
          />
          {errors.password && (
            <p className="text-sm text-[#f85a5a] font-medium">
              {errors.password}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-sm text-gray-12 font-semibold inline-block"
          >
            Повторите пароль
          </label>
          <Input
            placeholder="Email вашего аккаунта"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword || ""}
            error={!!errors.confirmPassword}
            onChange={(e) =>
              handleChange(
                e.target.name as keyof IChangePassword,
                e.target.value
              )
            }
          />
          {errors.confirmPassword && (
            <p className="text-sm text-[#f85a5a] font-medium">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
      <div className="flex mt-4 gap-2">
        <Button variant="secondary" onClick={onClose}>
          Отменить
        </Button>
        <Button onClick={handleChangePassword} isLoading={isLoading}>
          Подтвердить
        </Button>
      </div>
    </div>
  );
};

export default NewPassword;
