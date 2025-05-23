import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@prisma/client";
import { Pen } from "lucide-react";
import UpdateUserForm from "../update-user-form";

type Props = {
  user: User;
};
export default function UpdateUserModal({ user }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-sm text-white" size={"sm"}>
          <Pen />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:p-2 max-sm:py-6">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>
        <UpdateUserForm user={user} />
        <DialogDescription className="sr-only">
          Update your user details here.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
