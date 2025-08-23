import { UserInfo } from "./settings-tabs";

import VerifyEmailForm from "./forms/verify-email-form";
import EditPersonalInformationForm from "./forms/edit-personal-information-form";
import InfoBox from "./info-box";

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
        <InfoBox label="full name" infoText={user.name} />
        <div className="flex flex-col gap-1 pb-2">
          <span className="text-[17px] capitalize text-gray-500">email</span>
          <div className="flex items-center gap-2 max-[390px]:flex-col">
            <span>{user.email}</span>
            {!user.emailVerified && <VerifyEmailForm />}
          </div>
        </div>

        <InfoBox label="phone number" infoText={user.phone} />

        <InfoBox label="role" infoText={user.role} />
      </div>
    </div>
  );
}
