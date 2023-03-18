import { useContext, useState } from "react";
import { RiFileCopy2Line, RiMoneyEuroCircleLine } from "react-icons/ri";
import { SuccessToast } from "../../utils/toast";
import { AuthContext } from "../Auth/AuthProvider";
import PaymentModal from "./PaymentModal";

export const ProfilBox: React.FC = () => {
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);

  const { user, logout } = useContext(AuthContext);

  const handleCodeCopy = () => {
    navigator.clipboard.writeText(user?.referralCode ?? "");
    SuccessToast("Code parrainage copié");
  };

  return (
    <div className="border-t border-white/5 p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <div
            className="text-white cursor-pointer flex flex-row items-center space-x-1"
            onClick={handleCodeCopy}
          >
            <div>Code parrainage</div>
            <RiFileCopy2Line />
          </div>
          <span className="text-white font-semibold text-sm">{`${user?.firstname} ${user?.lastname}`}</span>
          <span
            onClick={() => logout()}
            className="text-white/50  text-sm cursor-pointer"
          >
            Se déconnecter
          </span>
        </div>
        <div
          className="bg-white/30 flex flex-row items-center px-2 py-1 gap-2 cursor-pointer"
          onClick={() => setPaymentModalOpen(true)}
        >
          <span className="text-white font-semibold text-lg">
            {user?.balance.toFixed(2)}
          </span>
          <RiMoneyEuroCircleLine color="white" size={20} />
        </div>
      </div>
      {paymentModalOpen && (
        <PaymentModal onClose={() => setPaymentModalOpen(false)} />
      )}
    </div>
  );
};
