import { UserInfo } from "./settings-tabs";

import VerifyEmailForm from "./forms/verify-email-form";
import EditPersonalInformationForm from "./forms/edit-personal-information-form";

type Props = {
  user: UserInfo;
};
export default function PersonalInfoContent({ user }: Props) {
  return (
    <div>
      <div className="mb-2 flex  justify-between items-center">
        <span className="text-xl font-semibold ">Personal Information</span>
        <EditPersonalInformationForm user={user} />
      </div>
      <div className="divide-y-2 flex flex-col gap-4 mb-4">
        <div className="flex flex-col gap-1 pb-2">
          <span className="text-[17px] capitalize text-gray-500">
            full name
          </span>
          <span className="capitalize">{user.name}</span>
        </div>
        <div className="flex flex-col gap-1 pb-2">
          <span className="text-[17px] capitalize text-gray-500">email</span>
          <div className="flex items-center gap-2 max-[300px]:flex-col">
            <span>{user.email}</span>
            {!user.emailVerified && <VerifyEmailForm />}
          </div>
        </div>
        <div className="flex flex-col gap-1 pb-2">
          <span className="text-[17px] capitalize text-gray-500">
            phone number
          </span>
          <span className="capitalize">{user.phone}</span>
        </div>
        <div className="flex flex-col gap-1 pb-2">
          <span className="text-[17px] capitalize text-gray-500">role</span>
          <span className="capitalize">{user.role}</span>
        </div>
      </div>
    </div>
  );
}
