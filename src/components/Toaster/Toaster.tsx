import { useToaster } from "../../store/store";
import Toast from "./Toast";

const Toaster = () => {
  const toasts = useToaster((s) => s.toasts);

  return (
    <div className="fixed  z-40 flex flex-col bottom-2 gap-2 right-2">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          title={t.title}
          subtitle={t.subtitle}
          type={t.type}
          id={t.id}
          onToastFinish={t.onToastFinish}
        />
      ))}
    </div>
  );
};

export default Toaster;
