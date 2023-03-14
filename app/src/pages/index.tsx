import ContestModal from "@/components/ContestModal/ContestModal";
import ContestsList from "@/components/ContestsList/ContestsList";
import ListTitle from "@/components/ListTitle/ListTitle";
import SearchBar from "@/components/Searchbar/Searchbar";
import { useState } from "react";
import { useGetContestsQuery } from "../../features/api/contest.api";
import Contest from "../../features/models/contest.model";

export default function Home() {
  const [selectedContest, setSelectedContest] = useState<Contest>();

  const { data: contests } = useGetContestsQuery();

  return (
    <div>
      <SearchBar />
      <div className="px-5">
        <div className="py-5">
          <ListTitle title="Top concours" />
        </div>
        <ContestsList contests={contests ?? []} onSelectContest={setSelectedContest} />
        <div className="py-5">
          <ListTitle title="Concours terminés" />
        </div>
      </div>
      {selectedContest && (
        <ContestModal contest={selectedContest} onClose={() => setSelectedContest(undefined)} />
      )}
    </div>
  );
}
