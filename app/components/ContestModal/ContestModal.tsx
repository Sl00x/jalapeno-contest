import { FC, useContext } from "react";
import { RiGiftLine, RiListCheck, RiTicket2Line } from "react-icons/ri";
import Contest from "../../features/models/contest.model";
import { getStep } from "../../utils/contest";
import ContestSteps from "./ContestSteps";
import { useGetContestQuery, useParticipateMutation } from "../../features/api/contest-api";
import { AuthContext } from "../Auth/AuthProvider";
import { SuccessToast } from "../../utils/toast";
import ContestModalButton from "./ContestModalButton";
import { useTranslation } from "next-i18next";

interface ContestModalProps {
  contestId: Contest["id"];
  onClose: () => void;
}

const ContestModal: FC<ContestModalProps> = ({ contestId, onClose }) => {
  const { data: contest } = useGetContestQuery(contestId);

  const { t } = useTranslation("contest");

  const [participate] = useParticipateMutation();
  const { user, refetch } = useContext(AuthContext);

  if (!contest) {
    return null;
  }

  const { stepNumber } = getStep(contest.steps, contest.participants.length);
  const tickets = contest.participants.filter(({ user: { id } }) => id === user?.id).length;

  const handleParticipate = async () => {
    await participate(contest.id);
    SuccessToast(`${t("you_just_took_a_ticket_for")} ${contest.name}`);
    refetch();
  };

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 overflow-y-auto" onClick={onClose}>
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-row space-x-6">
                <div>
                  <div className="bg-gray-light p-5">
                    <RiGiftLine className="text-gray-darker" size={50} />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="text-3xl font-bold">{contest.name}</div>
                  <div className="flex flex-row items-center space-x-8">
                    <div className="flex flex-row items-center space-x-2">
                      <RiListCheck />
                      <div>
                        {t("step")}:{" "}
                        <span className="text-red-jalapeno font-medium">
                          {stepNumber}/{contest.steps.length}
                        </span>
                      </div>
                    </div>
                    {user !== undefined && (
                      <div className="flex flex-row items-center space-x-2">
                        <RiTicket2Line />
                        <div>
                          {t("my_tickets")}:{" "}
                          <span className="text-red-jalapeno font-medium">{tickets}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-black/50 text-xs max-h-20 overflow-y-auto">
                    {contest.description}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <ContestSteps steps={contest.steps} participants={contest.participants.length} />
              </div>
            </div>
            {user !== undefined && (
              <ContestModalButton contest={contest} onClick={handleParticipate} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestModal;
