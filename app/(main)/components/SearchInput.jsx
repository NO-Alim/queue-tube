"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchInput = ({ redirectBaseUrl }) => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchValue.trim()) {
      router.push(
        `${redirectBaseUrl}?title=${encodeURIComponent(searchValue.trim())}`
      );
      setSearchValue("");
    }
  };

  return (
    <div className="relative h-10 max-lg:w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search Playlist..."
        className="pl-8 pr-3 py-2 text-sm"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
