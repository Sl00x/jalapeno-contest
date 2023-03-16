import { FC } from "react";
import Contest from "../../features/models/contest.model";
import ContestCard from "./ContestCard";

interface ContestsListProps {
  contests: Contest[];
  onSelectContestId: (contestId: Contest["id"]) => void;
}

const ContestsList: FC<ContestsListProps> = ({ contests, onSelectContestId }) => {
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
