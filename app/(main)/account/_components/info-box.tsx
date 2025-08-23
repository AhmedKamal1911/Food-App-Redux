type Props = {
  label: string;
  infoText: string;
};
export default function InfoBox({ label, infoText }: Props) {
  return (
    <div className="flex flex-col gap-1 pb-2">
      <span className="text-[17px] capitalize text-gray-500">{label}</span>
      <span className="capitalize">{infoText}</span>
    </div>
  );
}
