import clsx from "clsx";
import { FC, useState } from "react";
import { useTranslation } from "next-i18next";
import { RiUser2Line } from "react-icons/ri";
import Contest from "../../features/models/contest.model";

interface ContestStepsProps {
  steps: Contest["steps"];
  participants: number;
}

const ContestSteps: FC<ContestStepsProps> = ({ steps, participants }) => {
  const [tab, setTab] = useState<number>(0);

  const { t } = useTranslation("contest");

  const step = steps[tab];
  const percent = Math.min((participants * 100) / step.threshold, 100);

  return (
    <div>
      <div className="flex flex-row items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex-1 flex justify-center">
            <div className="cursor-pointer" onClick={() => setTab(index)}>
              <div>
                {t("step")} {index + 1}
              </div>
              <div
                className={clsx(
                  "mt-1 w-full h-0.5",
                  tab === index ? "bg-red-jalapeno-lighter" : "bg-transparent"
                )}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div key={step.id} className="flex flex-row space-x-4 w-full">
          <div className="flex-1">
            <img src={step.prize.image_url} className="w-full" />
          </div>
          <div className="flex-[2]">
            <div className="font-medium">{step.prize.name}</div>
            <div className="text-black/50 text-xs max-h-24 overflow-y-auto">
              {step.prize.description}
            </div>
            <div className="flex flex-row justify-end mr-2">
              <div className="px-2 py-1 bg-red-jalapeno-lighter rounded-full flex flex-row justify-between items-center space-x-1">
                <RiUser2Line color="white" size={12} />
                <div className="text-white text-xs">
                  {participants}/{step.threshold}
                </div>
              </div>
            </div>
            <div className="mt-1 w-full h-2 bg-gray-dark relative">
              <div
                className="absolute h-2 bg-red-jalapeno-lighter"
                style={{
                  width: `${percent}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestSteps;
