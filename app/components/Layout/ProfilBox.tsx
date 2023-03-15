import { useContext } from "react";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { AuthContext } from "../Auth/AuthProvider";

export const ProfilBox: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="border-t border-white/5 p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <span className="text-white font-semibold text-sm">{`${user?.firstname} ${user?.lastname}`}</span>
          <span
            onClick={() => logout()}
            className="text-white/50  text-sm cursor-pointer"
          >
            Se déconnecter
          </span>
        </div>
        <div className="bg-white/30 flex flex-row items-center px-2 py-1 gap-2">
          <span className="text-white font-semibold text-xl">
            {user?.balance}
          </span>
          <RiMoneyEuroCircleLine color="white" size={20} />
        </div>
      </div>
    </div>
  );
};
