import { FC } from "react";
import Contest from "../../../features/models/contest.model";

interface ContestModalProps {
  contest: Contest;
  onClose: () => void;
}

const ContestModal: FC<ContestModalProps> = ({ contest, onClose }) => {
  return <div className="flex flex-row space-x-4"></div>;
};

export default ContestModal;
