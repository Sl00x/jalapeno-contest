import { FC } from "react";
import { useTranslation } from "next-i18next";
import Contest from "../../features/models/contest.model";
import ContestCard from "./ContestCard";

interface ContestsListProps {
  contests: Contest[];
  onSelectContestId: (contestId: Contest["id"]) => void;
}

const ContestsList: FC<ContestsListProps> = ({ contests, onSelectContestId }) => {
  const { t } = useTranslation("contest");

  if (contests.length === 0) {
    return <div className="text-black/70">{t("no_contest_at_the_moment")}</div>;
  }
  return (
    <div className="flex flex-row space-x-4">
      {contests.map((contest) => (
        <ContestCard
          key={contest.id}
          contest={contest}
          onClick={() => onSelectContestId(contest.id)}
        />
      ))}
    </div>
  );
};

export default ContestsList;
