import ModalPortal from "../ModalPortal";
import MultiForm from "./MultiForm";
import ModalContainer from "../ModalContainer";
import ModalHeader from "../ModalHeader";

interface IChangePassword {
  onClose: () => void;
}

const ChangePassword = ({ onClose }: IChangePassword) => {
  return (
    <ModalPortal onClose={onClose}>
      <ModalContainer>
        <ModalHeader onClose={onClose} title="ИЗМЕНИТЬ ПАРОЛЬ" />
        <div className="p-4 mt-4">
          <MultiForm onClose={onClose} />
        </div>
      </ModalContainer>
    </ModalPortal>
  );
};

export default ChangePassword;
