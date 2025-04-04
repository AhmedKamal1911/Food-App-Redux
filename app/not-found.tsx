import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-secondary flex flex-col items-center justify-center text-center">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative">
            <Image
              src={"/images/decorations/404.png"}
              height={277}
              width={600}
              alt="404"
            />
            <Image
              src={"/images/decorations/alien-ship.png"}
              height={117}
              width={160}
              alt="alien ship"
              className="absolute bottom-full end-0  "
            />
          </div>
          <p className="uppercase text-3xl sm:text-4xl text-white font-bold">
            OoOps! 404 - page not found
          </p>
          <Button
            asChild
            className="rounded-3xl  hover:bg-white hover:text-primary  p-7 text-2xl sm:text-3xl"
          >
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
