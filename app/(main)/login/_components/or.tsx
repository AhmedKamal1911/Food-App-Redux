type Props = {};
export default function Or({}: Props) {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="h-0.5 w-full bg-gray-300 rounded-sm" />
      <span className="mx-3 text-center text-gray-600 font-bold text-xl capitalize">
        or
      </span>
      <div className="h-0.5 w-full bg-gray-300 rounded-sm" />
    </div>
  );
}
