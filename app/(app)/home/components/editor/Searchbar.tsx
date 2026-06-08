import { Search } from "lucide-react";
import React from "react";

type SearchProps = {
    search: string,
    setSearch: (value: string) => void;
}

const Searchbar:React.FC<SearchProps> = ({search, setSearch}) => {

  return (
    <>
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 shadow-sm transition-colors focus-within:border-blue-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
        <Search className="h-4 w-4 shrink-0 text-gray-400" />
        <input
          type="text"
          placeholder="Search notes"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
          }}
          className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />
      </div>
    </>
  );
};

export default Searchbar;
