export function CategoriesListSkeleton() {
  return (
    <ul className="divide-y divide-gray-200">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="py-4">
          <div className="h-5 w-40 bg-gray-300 rounded animate-pulse" />
        </li>
      ))}
    </ul>
  );
}
