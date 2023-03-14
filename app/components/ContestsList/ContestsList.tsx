import { FC } from "react";
import Contest from "../../features/models/contest.model";
import ContestCard from "./ContestCard";

interface ContestsListProps {
  contests: Contest[];
  onSelectContest: (contest: Contest) => void;
}

const ContestsList: FC<ContestsListProps> = ({ contests, onSelectContest }) => {
  return (
    <div className="flex flex-row space-x-4">
      {contests.map((contest) => (
        <ContestCard
          key={contest.id}
          contest={contest}
          onClick={() => onSelectContest(contest)}
        />
      ))}
    </div>
  );
};

export default ContestsList;
