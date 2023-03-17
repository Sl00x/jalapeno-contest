import { FC } from "react";
import Contest from "../../features/models/contest.model";
import ContestsList from "../ContestsList/ContestsList";

interface Props {
  contests: Contest[];
  onSelectContestId: (contestId: Contest["id"]) => void;
}

const Search: FC<Props> = ({ contests, onSelectContestId }) => {
  return (
    <div>
      <div className="px-5 pb-5">
        <ContestsList contests={contests} onSelectContestId={onSelectContestId} />
      </div>
    </div>
  );
};

export default Search;
