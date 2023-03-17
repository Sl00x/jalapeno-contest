import SearchBar from "../../components/Searchbar/Searchbar";
import HomeList from "../../components/Home/HomeList";
import { useState } from "react";
import { useGetContestsQuery } from "../../features/api/contest-api";
import ContestModal from "../../components/ContestModal/ContestModal";
import Contest from "../../features/models/contest.model";
import Search from "../../components/Home/Search";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [selectedContestId, setSelectedContestId] = useState<Contest["id"]>();

  const { data: contests } = useGetContestsQuery(
    query === "" ? undefined : query
  );

  return (
    <div className="h-full">
      <SearchBar query={query} onQueryChange={setQuery} />
      {query === "" ? (
        <HomeList
          contests={contests ?? []}
          onSelectContestId={setSelectedContestId}
        />
      ) : (
        <Search
          contests={contests ?? []}
          onSelectContestId={setSelectedContestId}
        />
      )}
      {selectedContestId && (
        <ContestModal
          contestId={selectedContestId}
          onClose={() => setSelectedContestId(undefined)}
        />
      )}
    </div>
  );
}
