import { Button } from "../ui/button";

type Props = {
  page: number;
  lastPage: number;
  goToPage: (page: number) => void;
};
export default function PaginationControls({
  page,
  lastPage,
  goToPage,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-2 sm:gap-4 px-4 py-4">
      <span className="text-sm text-gray-500">
        Page {page} of {lastPage}
      </span>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(page + 1)}
          disabled={page >= lastPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
