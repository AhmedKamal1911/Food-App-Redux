"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Pagination({
  totalPages,
  currentPage,
  currentPageLocation,
  className,
}: {
  totalPages: number;
  currentPage: number;
  currentPageLocation: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <ShadcnPagination className={className}>
      <PaginationContent className="gap-3">
        <PaginationItem>
          <Button
            disabled={currentPage === 1}
            onClick={() => {
              if (currentPage > 1) {
                return router.replace(
                  `/category/${currentPageLocation}?page=${currentPage - 1}`
                );
              }
            }}
            className="gap-0 p-2!"
          >
            <ChevronLeftIcon className="size-6" /> Prev
          </Button>
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              className={`${
                currentPage === i + 1 ? "ring-2 ring-primary/60" : ""
              }`}
              href={{ query: { page: i + 1 } }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => {
              if (currentPage !== totalPages) {
                return router.replace(
                  `/category/${currentPageLocation}?page=${currentPage + 1}`
                );
              }
            }}
            className="gap-0 p-2!"
          >
            Next <ChevronRightIcon className="size-6" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
