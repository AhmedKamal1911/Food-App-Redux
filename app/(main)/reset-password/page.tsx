import ResetPasswordForm from "./_components/reset-password-form";

import { getUserByResetToken } from "@/lib/server/queries";

import InvalidTokenCard from "./_components/invalid-token-card";
import PageLayout from "./_components/page-layout";

type Props = {
  searchParams: Promise<{ token: string | null }>;
};
export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;
  if (!token)
    return (
      <PageLayout>
        <InvalidTokenCard />
      </PageLayout>
    );
  const user = await getUserByResetToken(token);

  return (
    <PageLayout>
      {!user ? (
        <InvalidTokenCard />
      ) : (
        <div className="w-full max-w-md  border border-gray-100 bg-white rounded-lg shadow-lg p-2 sm:p-8">
          <span className="font-bold mb-3 block">Reset Password :</span>
          <ResetPasswordForm token={token} />
        </div>
      )}
    </PageLayout>
  );
}
