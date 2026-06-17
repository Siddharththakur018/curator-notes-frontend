import { Search } from "lucide-react";
import React from "react";

type SearchProps = {
    search: string,
    setSearch: (value: string) => void;
}

const Searchbar:React.FC<SearchProps> = ({search, setSearch}) => {

  return (
    <>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1F1F1E] px-3 py-2.5 shadow-sm transition-colors focus-within:border-[#D9D6EA]/60 focus-within:ring-2 focus-within:ring-[#D9D6EA]/10">
        <Search className="h-4 w-4 shrink-0 text-[#8B8A84]" />
        <input
          type="text"
          placeholder="Search notes"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
          }}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#6A6964]"
        />
      </div>
    </>
  );
};

export default Searchbar;
