export function ProductsGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-7 p-2 flex-1"
      style={{
        gridAutoRows: "max-content",
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse  w-full">
          {/* Image placeholder */}
          <div className="h-48 bg-gray-200 rounded-md mb-4" />

          {/* Title placeholder */}
          <div className="h-5 w-11/12 mx-auto bg-gray-200 rounded mb-2" />

          {/* Subtitle placeholder */}
          <div className="h-4 w-1/2 mx-auto  bg-gray-200 rounded  mb-4" />

          {/* Button placeholder */}
          <div className="h-10  mx-auto max-w-1/2 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
