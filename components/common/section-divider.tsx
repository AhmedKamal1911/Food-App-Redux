export default function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center w-full px-5">
      <div className="h-1 w-full bg-gray-300 rounded-sm" />
      <span className="mx-4 text-center font-bold text-3xl capitalize">
        {title}
      </span>
      <div className="h-1 w-full bg-gray-300 rounded-sm" />
    </div>
  );
}
