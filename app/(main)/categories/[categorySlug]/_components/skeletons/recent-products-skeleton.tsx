export function RecentProductsSkeleton() {
  return (
    <ul className="space-y-3 mt-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="flex max-sm:flex-col max-sm:items-center gap-3 ">
          {/* Image skeleton */}
          <div className="size-24 w-30 bg-gray-300 rounded animate-pulse" />

          {/* Text skeleton */}
          <div className="flex  flex-col max-sm:items-center gap-1 w-full">
            <div className="h-5 w-32 bg-gray-300 rounded animate-pulse" />
            <div className="h-6 w-48 bg-gray-300 rounded animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  );
}
