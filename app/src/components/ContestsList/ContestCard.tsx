import { FC } from "react";
import Contest from "../../../features/models/contest.model";
import TimeAgo from "javascript-time-ago";
import clsx from "clsx";
import { RiUser2Line } from "react-icons/ri";

const getStep = (steps: Contest["steps"], participants: number) => {
  let actualStep = steps[0];

  for (const step of steps) {
    if (participants < step.threshold) break;
    actualStep = step;
  }

  return actualStep;
};

interface ContestCardProps {
  contest: Contest;
}

const timeAgo = new TimeAgo("fr-FR");

const ContestCard: FC<ContestCardProps> = ({ contest }) => {
  const participants = contest.participants.length;
  const step = getStep(contest.steps, participants);
  const startAt = new Date(contest.startAt);
  const endAt = new Date(contest.endAt);
  const timeLeft = timeAgo.format(endAt);
  const hasBegan = startAt <= new Date();

  const percent = (participants * 100) / step.threshold;

  return (
    <div className="bg-gray-light pt-4">
      <div className="px-8 flex flex-col space-y-4">
        <div className="text-2xl text-center">{contest.name}</div>
        <div className="flex w-full items-center justify-center">
          <img src={step.prize.image_url} className="max-w-[200px] max-h-[200px]" />
        </div>
        <div
          className={clsx(
            "flex flex-row justify-between items-center w-full",
            hasBegan ? "" : "pb-4"
          )}
        >
          <div className="text-black/50 text-sm">fin {timeLeft}</div>
          <div className="font-normal text-xl">7€</div>
        </div>
      </div>
      {hasBegan && (
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