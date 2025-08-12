import LoginForm from "./_components/login-form";

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/dal/user";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description:
    "Log in to your Pizzon account to track orders, save favorites, and enjoy exclusive deals on fresh pizzas and meals.",
  openGraph: {
    title: "Login | Pizzon Food Delivery",
    description:
      "Access your Pizzon account to order faster, track deliveries, and get special offers on your favorite meals.",
  },
};
export default async function LoginPage() {
  const session = await getCurrentSession();
  if (session) redirect("/");

  return (
    <main>
      <section className="pt-50 pb-10 bg-secondary min-h-[80vh] bg-[url('/images/decorations/chef-bg.png')] bg-cover">
        <div className="container">
          <div className="flex justify-center">
            <div className="bg-white p-2 md:p-4 rounded-sm max-w-[400px] w-full">
              <span className="text-center block mb-5 text-2xl uppercase">
                Login Now
              </span>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
