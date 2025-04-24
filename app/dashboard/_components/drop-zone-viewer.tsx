import { Control, FieldPath, FieldValues } from "react-hook-form";
import DropZoneField from "./drop-zone-field";
import ProductImgViewer from "./product-img-viewer";
import { useEffect } from "react";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  setPreviewUrl: (url: string) => void;
  previewUrl: string;
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  onCloseImg: () => void;
  className?: string;
};

export default function DropZoneViewer<
  T extends FieldValues = FieldValues,
  K extends FieldPath<T> = FieldPath<T>
>({
  setPreviewUrl,
  onCloseImg,
  previewUrl,
  control,
  name,
  placeholder,
  className,
}: Props<T, K>) {
  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
        console.log("URL revoked");
      }
    };
  }, [previewUrl]);
  return (
    <div>
      {/* Preview uploaded image */}
      {previewUrl && (
        <ProductImgViewer
          onProductImgHide={onCloseImg}
          src={previewUrl}
          alt={`product image`}
        />
      )}

      {/* Show DropZone if there's no preview */}
      {!previewUrl && (
        <DropZoneField
          setPreviewImage={setPreviewUrl}
          control={control}
          name={name}
          placeholder={placeholder}
          className={className}
        />
      )}
    </div>
  );
}
