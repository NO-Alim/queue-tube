"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CustomPagination = ({
  totalCount,
  redirectBaseUrl,
  limit = parseInt(process.env.NEXT_PUBLIC_TOTAL_COUNT, 10) || 10,
}) => {
  const totalPages = Math.max(1, Math.ceil((totalCount || 0) / limit));
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handleClick = (page) => {
    const url = `${redirectBaseUrl || pathname}?page=${page}`;
    push(url);
  };

  if (totalPages < 1) return null; // No pages to render

  return (
    <Pagination>
      <PaginationContent className="flex items-center justify-center space-x-2">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handleClick(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={() => handleClick(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }
          return null;
        })}

        {totalPages > 3 && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              handleClick(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
