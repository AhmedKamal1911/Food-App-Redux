export default function MenuProductsSkeleton() {
  return (
    <div className="flex flex-col mt-10 gap-10 items-center justify-center">
      <div className="animate-pulse p-5 w-[430px] max-w-full bg-gray-300 rounded-sm" />
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  xl:gap-10 "
        }
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-8"
          >
            <div className="size-[150px] bg-gray-300 rounded-[3px] animate-pulse" />
            <div className="flex flex-col gap-4 items-center">
              <span className="p-2 w-[245px]  bg-gray-300 animate-pulse rounded-[2px]" />
              <span className="p-2 w-[200px]  bg-gray-300 animate-pulse rounded-[2px]" />
            </div>
            <div className="flex flex-col gap-4 items-center">
              <span className="p-2 w-[50px]  bg-gray-300 animate-pulse rounded-[2px]" />
              <span className="p-4 w-[110px] mx-auto bg-gray-300 animate-pulse rounded-[2px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
