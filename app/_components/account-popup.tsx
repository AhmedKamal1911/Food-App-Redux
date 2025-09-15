"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function AccountPopup() {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const isCalledFirstTimeRef = useRef(false);
  useEffect(() => {
    if (session.status === "unauthenticated" && !isCalledFirstTimeRef.current) {
      isCalledFirstTimeRef.current = true;
      setOpen(true);
    }
  }, [session]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-sm:p-2">
        <DialogHeader>
          <DialogTitle>Admin Info Testing Dialog</DialogTitle>
          <DialogDescription className="sr-only">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-md p-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-100">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="font-semibold text-indigo-600 max-[300px]:text-[12px]">
              medo0122689@gmail.com
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-100">
            <span className="font-medium text-gray-600">Password:</span>
            <span className="font-semibold text-red-500 max-[300px]:text-[12px]">
              asdASD123456@
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-100">
            <span className="font-medium text-gray-600">Role:</span>
            <span className="font-semibold text-green-600 max-[300px]:text-[12px]">
              Super admin
            </span>
          </div>
        </div>

        <div className="mt-4 text-sm bg-yellow-100 border border-yellow-300 rounded-lg p-3 leading-relaxed text-yellow-800">
          ⚠️ <span className="font-semibold">Important Notes:</span>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>
              Only{" "}
              <span className="font-semibold text-green-700">Super Admin</span>{" "}
              and <span className="font-semibold text-blue-700">Admins</span>{" "}
              can access the <span className="font-semibold">Dashboard</span>.
            </li>
            <li>
              The{" "}
              <span className="font-semibold text-green-700">Super Admin</span>{" "}
              has the privilege to assign{" "}
              <span className="font-semibold text-blue-700">Admin roles</span>{" "}
              to other users.
            </li>
            <li>
              If you prefer using a normal user account, you can create one
              separately.
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
