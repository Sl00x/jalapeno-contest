import { RiLoginCircleLine, RiRegisteredLine } from "react-icons/ri";

interface Props {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export const SignBox: React.FC<Props> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="border-t border-white/5 p-4 px-2">
      <div className="flex flex-row justify-between items-center">
        <div
          onClick={() => onLoginClick?.()}
          className="bg-white/30 flex flex-row items-center px-2 py-1 gap-2 cursor-pointer text-white hover:bg-white hover:text-red-jalapeno"
        >
          <span>Connexion</span>
          <RiLoginCircleLine size={20} />
        </div>
        <div
          onClick={() => onRegisterClick?.()}
          className="bg-white/30 flex flex-row items-center px-2 py-1 gap-2 cursor-pointer text-white hover:bg-white hover:text-red-jalapeno"
        >
          <span>Inscription</span>
          <RiRegisteredLine size={20} />
        </div>
      </div>
    </div>
  );
};
