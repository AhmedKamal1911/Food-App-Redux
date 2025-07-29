"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { User } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLES_LIST } from "@/lib/data";
import { toast } from "react-toastify";
import {
  UpdateUserInputs,
  updateUserSchema,
} from "@/lib/validation/update-user-schema";
import { updateUserRoleAction } from "@/lib/server/actions/user/update-user-role-action";
import { Dispatch, SetStateAction } from "react";

export default function UpdateUserForm({
  user,
  setOpenDialog,
}: {
  user: User;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<UpdateUserInputs>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user.id,
      role: user.role,
    },
    mode: "onChange",
  });

  // 2. Define a submit handler.
  async function onSubmit(values: UpdateUserInputs) {
    try {
      const res = await updateUserRoleAction(values);
      if (res.success) {
        toast.success(res.message);
        setOpenDialog(false);
      }
      if (!res.success && res.error.type === "error") {
        toast.error(res.error.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Network Error Occurred");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex">
              <FormLabel>User Role :</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-sm focus-visible:ring-primary/50 capitalize">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="capitalize">
                  {ROLES_LIST.map((role, i) => (
                    <SelectItem key={i} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="sr-only">
                Select a role to assign to the user. This will be used to
                determine their permissions and access levels.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Updating" : "Update"}
        </Button>
      </form>
    </Form>
  );
}
