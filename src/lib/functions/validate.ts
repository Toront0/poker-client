export interface ILoginForm {
  username: string;
  password: string;
}

export interface ISignUpForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const validateSignUpForm = (v: ISignUpForm) => {
  const errors = {} as ISignUpForm;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) && v.email !== undefined) {
    errors.email = "Введите корректный адрес почты.";
  }

  if (v.username?.length < 3 || v.username?.length > 14) {
    errors.username = "Имя пользователя должно содержать от 3 до 14 букв.";
  }

  if (v.password?.length < 8) {
    errors.password = "Пароль должен содержать как минимум 8 символов.";
  }

  if (v.confirmPassword !== v.password) {
    errors.confirmPassword = "Пароли не совпадают.";
  }

  return errors;
};

export interface ICreateRoomForm {
  name: string;
  mode: string;
  amountOfPlayers: number;
  buyIn: number;
  isPrivate: boolean;
  autoStart: boolean;
  roomPassword: string;
  prizeDestribution: string;
}

export interface IChangePassword {
  password: string;
  confirmPassword: string;
}

export const validateChangePassword = (val: IChangePassword) => {
  const errors = {} as IChangePassword;

  if (val.password?.length < 8) {
    errors.password = "Пароль должен содержать как минимум 8 символов.";
  }

  if (val.confirmPassword !== val.password) {
    errors.confirmPassword = "Пароли не совпадают.";
  }

  return errors;
};
