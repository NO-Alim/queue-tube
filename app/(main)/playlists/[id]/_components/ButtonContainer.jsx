"use client";

import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

const ButtonContainer = ({ nextPageToken = "", prevPageToken = "" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (pageToken) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (pageToken) {
      newParams.set("pageToken", pageToken);
    } else {
      newParams.delete("pageToken");
    }
    router.push(`?${newParams.toString()}`);
  };

  return (
    <PaginationContent className="flex items-center justify-center space-x-2">
      <PaginationItem>
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (prevPageToken) handleClick(prevPageToken);
          }}
          className={`px-4 py-2 rounded-md ${
            !prevPageToken ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Prev
        </PaginationPrevious>
      </PaginationItem>
      <PaginationItem>
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (nextPageToken) handleClick(nextPageToken);
          }}
          className={`px-4 py-2 rounded-md ${
            !nextPageToken ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Next
        </PaginationNext>
      </PaginationItem>
    </PaginationContent>
  );
};

export default ButtonContainer;
