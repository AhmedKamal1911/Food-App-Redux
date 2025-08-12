import { getCurrentSession } from "@/lib/dal/user";
import ForgetPasswordForm from "./_components/forget-password-form";
import { redirect, RedirectType } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Forgot your Pizzon account password? Easily reset it here to get back to ordering your favorite fresh pizzas and meals.",
  openGraph: {
    title: "Forgot Password | Pizzon Food Delivery",
    description:
      "Reset your Pizzon password quickly and securely. Continue enjoying fast delivery and delicious food without interruption.",
  },
};

export default async function ForgetPasswordPage() {
  const session = await getCurrentSession();
  if (session) return redirect("/", RedirectType.replace);
  return (
    <main>
      <section className="pt-35 md:pt-50 pb-10 bg-secondary h-[50vh] md:min-h-[80vh] bg-[url('/images/decorations/chef-bg.png')] bg-cover">
        <div className="container">
          <div className="flex justify-center">
            <div className="bg-white p-2 md:p-4 rounded-sm max-w-[400px] w-full">
              <span className="text-center block mb-5 text-2xl uppercase">
                forget password
              </span>
              <ForgetPasswordForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
