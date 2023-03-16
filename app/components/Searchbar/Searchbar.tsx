import { FC } from "react";
import { RiSearchLine } from "react-icons/ri";

interface Props {
  onSearch?: (value: string) => void;
}

const SearchBar: FC = () => {
  return (
    <div className="w-full border-b border-black/[0.025] bg-black/[0.025] flex flex-row items-center gap-2 p-2">
      <RiSearchLine className="text-black/[0.17]" size={24} />
      <input
        placeholder="Rechercher..."
        className="text-lg text-black/[0.3] bg-black/[0] outline-none w-full"
      />
    </div>
  );
};

export default SearchBar;
