import LoginForm from "./_components/login-form";

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/dal/user";

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
