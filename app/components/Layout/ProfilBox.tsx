import { RiMoneyEuroCircleLine } from "react-icons/ri";

export const ProfilBox: React.FC = () => {
  return (
    <div className="border-t border-white/5 p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <span className="text-white font-semibold text-xl">Quenn Alexis</span>
          <span className="text-white/50  text-md cursor-pointer">
            Se déconnecter
          </span>
        </div>
        <div className="bg-white/30 flex flex-row items-center px-2 py-1 gap-2">
          <span className="text-white font-semibold text-xl">0.00</span>
          <RiMoneyEuroCircleLine color="white" size={20} />
        </div>
      </div>
    </div>
  );
};
