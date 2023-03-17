import { FC } from "react";
import { RiSearchLine } from "react-icons/ri";

interface Props {
  query: string;
  onQueryChange: (query: string) => void;
}

const SearchBar: FC<Props> = ({ query, onQueryChange }) => {
  return (
    <div className="w-full border-b border-black/[0.025] bg-black/[0.025] flex flex-row items-center gap-2 p-2">
      <RiSearchLine className="text-black/[0.17]" size={24} />
      <input
        placeholder="Rechercher..."
        className="text-lg text-black/[0.3] bg-black/[0] outline-none w-full"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
