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
import { useTransition } from "react";

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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  function navigateToPrevPage() {
    if (currentPage <= 1) return;
    startTransition(() => {
      router.replace(
        `/categories/${currentPageLocation}?page=${currentPage - 1}`
      );
    });
  }
  function navigateToNextPage() {
    if (currentPage === totalPages) return;
    startTransition(() => {
      router.replace(
        `/categories/${currentPageLocation}?page=${currentPage + 1}`
      );
    });
  }
  function navigateToPage(page: number) {
    startTransition(() => {
      router.replace(`/categories/${currentPageLocation}?page=${page}`);
    });
  }
  return (
    <ShadcnPagination className={className}>
      <PaginationContent className="gap-3">
        <PaginationItem>
          <Button
            disabled={currentPage === 1 || isPending}
            onClick={() => navigateToPrevPage()}
            className="gap-0 p-2!"
          >
            <ChevronLeftIcon className="size-6" /> Prev
          </Button>
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              className={`${
                currentPage === i + 1
                  ? "ring-2 ring-primary/60 pointer-events-none"
                  : ""
              } ${isPending ? "pointer-events-none" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                const p = i + 1;
                navigateToPage(p);
              }}
              href={{ query: { page: i + 1 } }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            disabled={currentPage === totalPages || isPending}
            onClick={() => navigateToNextPage()}
            className="gap-0 p-2!"
          >
            Next <ChevronRightIcon className="size-6" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
}
