import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  onProductImgHide: () => void;
};
export default function ProductImgViewer({
  src,
  alt,
  onProductImgHide,
}: Props) {
  return (
    <div className="flex items-center justify-center relative min-h-[200px] border rounded-md">
      <Button
        onClick={onProductImgHide}
        type="button"
        variant={"destructive"}
        size={"sm"}
        className="absolute top-2 right-2 p-1! rounded-sm "
      >
        <X className="size-6" />
      </Button>
      <Image
        src={src}
        alt={alt}
        height={150}
        width={150}
        className="rounded-md object-cover aspect-square "
        priority
      />
    </div>
  );
}
