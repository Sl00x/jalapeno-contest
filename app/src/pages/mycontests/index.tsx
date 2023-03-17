import ContestModal from "../../../components/ContestModal/ContestModal";
import ContestsList from "../../../components/ContestsList/ContestsList";
import ListTitle from "../../../components/ListTitle/ListTitle";
import { useState } from "react";
import { useGetSelfContestsQuery } from "../../../features/api/contest-api";
import Contest from "../../../features/models/contest.model";

export default function MyContests() {
  const [selectedContestId, setSelectedContestId] = useState<Contest["id"]>();

  const { data: contests } = useGetSelfContestsQuery();

  return (
    <div className="h-full">
      <div className="px-5 pb-5">
        <div className="py-5">
          <ListTitle title="En cours" />
        </div>
        <ContestsList
          contests={
            contests?.filter(
              (contest) =>
                new Date(contest.startAt) <= new Date() && new Date(contest.endAt) >= new Date()
            ) ?? []
          }
          onSelectContestId={setSelectedContestId}
        />
        <div className="py-5">
          <ListTitle title="Concours terminés" />
        </div>
        <div>
          <ContestsList
            contests={contests?.filter((contest) => new Date(contest.endAt) <= new Date()) ?? []}
          />
        </div>
      </div>
      {selectedContestId && (
        <ContestModal
          contestId={selectedContestId}
          onClose={() => setSelectedContestId(undefined)}
        />
      )}
    </div>
  );
}
