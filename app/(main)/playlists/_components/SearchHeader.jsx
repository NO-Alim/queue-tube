"use client";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchInput from "../../components/SearchInput";

const SearchHeader = ({ filterByTitle }) => {
  const router = useRouter();

  const handleRemoveFilter = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("title");
    router.replace(`/playlists?${params.toString()}`);
  };
  return (
    <div className=" flex items-center justify-between">
      <SearchInput redirectBaseUrl={"/playlists"} />

      {filterByTitle && (
        <Badge variant="secondary" className=" pr-0 space-x-3">
          <span className=" text-sm">{filterByTitle}</span>
          <Badge className=" p-0 cursor-pointer" onClick={handleRemoveFilter}>
            <X className=" h-4 w-4" />
          </Badge>
        </Badge>
      )}
    </div>
  );
};

export default SearchHeader;
