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
import UpdateUserForm from "../forms/update-user-form";
import { useState } from "react";

type Props = {
  user: User;
};
export default function UpdateUserModal({ user }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <UpdateUserForm setOpenDialog={setOpen} user={user} />
        <DialogDescription className="sr-only">
          Update your user details here.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
