import Image from "next/image";
import RegisterForm from "./_components/register-form";

import { redirect, RedirectType } from "next/navigation";

import { getCurrentSession } from "@/lib/dal/user";

export default async function RegisterPage() {
  const session = await getCurrentSession();
  if (session) redirect("/", RedirectType.replace);

  return (
    <main>
      <section className="pt-30 pb-10 bg-secondary min-h-[80vh] bg-[url('/images/decorations/chef-bg.png')] bg-cover">
        <div className="container">
          <div className="flex max-md:flex-col bg-white rounded-sm overflow-hidden shadow-md shadow-gray-200/20">
            <div className="flex-1 max-md:hidden">
              <Image
                src={"/images/categories-section/pizza.jpg"}
                alt="pizza"
                priority
                height={1280}
                width={1280}
                className=" h-full"
              />
            </div>
            <div className="flex-1 p-4 md:p-8">
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
