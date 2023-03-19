import { FC } from "react";
import TimeAgo from "javascript-time-ago";
import clsx from "clsx";
import { RiUser2Line } from "react-icons/ri";
import { getStep } from "../../utils/contest";
import Contest from "../../features/models/contest.model";
import { useTranslation } from "next-i18next";

interface ContestCardProps {
  contest: Contest;
  onClick: () => void;
}

const ContestCard: FC<ContestCardProps> = ({ contest, onClick }) => {
  const { t, i18n } = useTranslation("contest");
  const timeAgo = new TimeAgo(i18n.language === "fr" ? "fr-FR" : "en-GB");

  const participants = contest.participants.length;
  const { step } = getStep(contest.steps, participants);
  const startAt = new Date(contest.startAt);
  const endAt = new Date(contest.endAt);
  const hasBegan = startAt <= new Date();
  const isDone = endAt <= new Date();
  const timeLeftPrefix = t(hasBegan ? (isDone ? "finished" : "ends") : "starts");
  const timeLeft = timeAgo.format(endAt);

  const percent = Math.min((participants * 100) / step.threshold, 100);

  return (
    <div
      className="bg-gray-light w-[450px] shadow-md max-w-[450px] pt-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="px-8 flex flex-col space-y-4">
        <div className="text-2xl text-center">{contest.name}</div>
        <div className="flex w-full items-center justify-center">
          <img src={step.prize.image_url} className="max-w-[200px] max-h-[200px] h-[200px]" />
        </div>
        <div
          className={clsx(
            "flex flex-row justify-between items-center w-full",
            hasBegan ? "" : "pb-4"
          )}
        >
          <div className="text-black/50 text-sm">
            {timeLeftPrefix} {timeLeft}
          </div>
          <div className="font-normal text-xl">{contest.price}€</div>
        </div>
      </div>
      {hasBegan && !isDone && (
        <div>
          <div className="flex flex-row justify-end mr-2">
            <div className="px-2 py-1 bg-red-jalapeno-lighter rounded-full flex flex-row justify-between items-center space-x-1">
              <RiUser2Line color="white" size={12} />
              <div className="text-white text-xs">{participants}</div>
            </div>
          </div>
          <div className="mt-1 w-full h-3 bg-gray-dark relative">
            <div
              className="absolute h-3 bg-red-jalapeno-lighter"
              style={{
                width: `${percent}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestCard;
