import ContestsList from "@/components/ContestsList/ContestsList";
import ListTitle from "@/components/ListTitle/ListTitle";
import SearchBar from "@/components/Searchbar/Searchbar";
import { useGetContestsQuery } from "../../features/api/contest.api";

export default function Home() {
  const { data: contests } = useGetContestsQuery();

  return (
    <div>
      <SearchBar />
      <div className="px-5">
        <div className="py-5">
          <ListTitle title="Top concours" />
        </div>
        <ContestsList contests={contests ?? []} />
        <div className="py-5">
          <ListTitle title="Concours terminés" />
        </div>
      </div>
    </div>
  );
}
