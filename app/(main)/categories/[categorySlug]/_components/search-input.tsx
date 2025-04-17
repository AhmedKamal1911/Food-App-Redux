import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";

export default function SearchInput({
  isDisabled = false,
}: {
  isDisabled: boolean;
}) {
  return (
    <Form action="">
      <div className="flex items-center">
        <Input
          disabled={isDisabled}
          placeholder="Search.."
          name="q"
          className="border-r-0 rounded-none focus-visible:border-primary transition-colors focus-visible:ring-0"
        />
        <Button
          disabled={isDisabled}
          type="submit"
          className="rounded-none block border-primary shadow-none"
        >
          <Search />
        </Button>
      </div>
    </Form>
  );
}
