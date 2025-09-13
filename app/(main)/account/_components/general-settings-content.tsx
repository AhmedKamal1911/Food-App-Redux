import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

import ChangePasswordForm from "./forms/change-password-form";
import { ProfileImageForm } from "./forms/profile-image-form";
import { UserInfo } from "./settings-tabs";

type Props = {
  hasPassword: boolean;
  profileImg: UserInfo["image"];
};
export default function GeneralSettingsContent({
  hasPassword,
  profileImg,
}: Props) {
  return (
    <div>
      <span className="text-xl font-semibold mb-2 block">General Settings</span>
      <div className="divide-y-2 flex flex-col gap-4 mb-4">
        <ProfileImageForm profileImg={profileImg} />
        <PasswordBox hasPassword={hasPassword} />
      </div>
    </div>
  );
}

function PasswordBox({ hasPassword }: { hasPassword: boolean }) {
  return (
    <div className="flex flex-col items-start gap-1 pb-2 w-full">
      <span className="text-[17px] capitalize text-gray-500 mb-1">
        Password
      </span>

      {hasPassword ? (
        <ChangePasswordForm />
      ) : (
        <Button
          variant="default"
          className="rounded-sm font-semibold flex items-center gap-2 text-white"
        >
          <PlusCircle className="w-4 h-4" />
          Create Password
        </Button>
      )}
    </div>
  );
}
