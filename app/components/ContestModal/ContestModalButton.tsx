import clsx from "clsx";
import { FC, useContext } from "react";
import { useTranslation } from "next-i18next";
import { RiTicket2Line } from "react-icons/ri";
import Contest from "../../features/models/contest.model";
import { AuthContext } from "../Auth/AuthProvider";

interface Props {
  contest: Contest;
  onClick: () => void;
}

const ContestModalButton: FC<Props> = ({ contest, onClick }) => {
  const { user } = useContext(AuthContext);

  const { t } = useTranslation("contest");

  const startAt = new Date(contest.startAt);
  const endAt = new Date(contest.endAt);
  const hasBegan = startAt <= new Date();
  const isDone = endAt <= new Date();

  let text: string = "";
  let canBuyTicket: boolean = false;
  if (!hasBegan) {
    text = t("contest_not_started_yet");
  } else if (isDone) {
    text = t("contest_over");
  } else {
    canBuyTicket = (user?.balance ?? 0) >= contest.price;
    text = canBuyTicket ? `${t("buy_a_ticket_for")} ${contest.price}€` : t("insufficient_funds");
  }

  return (
    <div
      onClick={() => canBuyTicket && onClick()}
      className={clsx(
        "w-full text-center mt-2 py-4 flex flex-row items-center justify-center space-x-2",
        canBuyTicket ? "bg-red-jalapeno text-white cursor-pointer" : "bg-gray-200 text-gray-600"
      )}
    >
      <RiTicket2Line size={20} />
      <div className="font-medium">{text}</div>
    </div>
  );
};

export default ContestModalButton;
