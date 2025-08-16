import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full bg-white rounded-sm">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="animate-spin">
          <Image
            src={"/images/decorations/pizza-loader.png"}
            height={100}
            width={100}
            alt="pizza loader img"
            priority
          />
        </div>
        <span className="capitalize text-2xl font-semibold text-primary animate-pulse">
          loading...
        </span>
      </div>
    </div>
  );
}
