import ResetPasswordForm from "./_components/reset-password-form";

import { getUserByResetToken } from "@/lib/server/queries";

import InvalidTokenCard from "./_components/invalid-token-card";
import PageLayout from "./_components/page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Securely reset your Pizzon account password to continue enjoying fresh pizzas, exclusive deals, and fast delivery.",
  openGraph: {
    title: "Reset Password | Pizzon Food Delivery",
    description:
      "Forgot your password? Reset it quickly and securely to keep ordering your favorite Pizzon pizzas and meals.",
  },
};
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
