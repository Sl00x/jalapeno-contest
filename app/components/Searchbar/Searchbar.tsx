import { FC } from "react";
import { useTranslation } from "next-i18next";
import { RiSearchLine } from "react-icons/ri";

interface Props {
  query: string;
  onQueryChange: (query: string) => void;
}

const SearchBar: FC<Props> = ({ query, onQueryChange }) => {
  const { t } = useTranslation("common");

  return (
    <div className="w-full border-b border-black/[0.025] bg-black/[0.025] flex flex-row items-center gap-2 p-2">
      <RiSearchLine className="text-black/[0.17]" size={24} />
      <input
        placeholder={`${t("search")}`}
        className="text-lg text-black/[0.3] bg-black/[0] outline-none w-full"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
