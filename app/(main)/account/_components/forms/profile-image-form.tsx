"use client";

import { Button } from "@/components/ui/button";
import { updateProfileImageAction } from "@/lib/server/actions/user/update-profile-image-action";
import { profileImageSchema } from "@/lib/validation/profile-image-schema";
import { Camera, LoaderCircle } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

export function ProfileImageForm({
  profileImageSrc,
}: {
  profileImageSrc: string | null;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(profileImageSrc);
  const [inputFileError, setInputFileError] = useState("");
  const [state, action, isPending] = useActionState(
    updateProfileImageAction,
    undefined
  );
  console.log({ inputFileError });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.status === "error") {
      setInputFileError(state.error.message);
      toast.error(state.error.message);
      return;
    }
    if (state?.status === "success") {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
      toast.success(state.message);
    }
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [state, imageSrc]);

  function handleImageFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const schemaResult = profileImageSchema.safeParse(file);
    if (!schemaResult.success) {
      const fileErrorMsg = schemaResult.error.flatten().formErrors[0];
      setInputFileError(fileErrorMsg);
      toast.error(fileErrorMsg);
    } else {
      const imageUrl = URL.createObjectURL(schemaResult.data);
      setImageSrc(imageUrl);
      formRef.current?.requestSubmit();
    }
  }

  return (
    <form
      ref={formRef}
      className="flex max-sm:flex-col items-center gap-5 pb-2 w-full"
      action={action}
    >
      <div className="rounded-full border-2 relative size-[150px]">
        {isPending && (
          <div className="flex items-center justify-center absolute inset-0 bg-gray-800/80 rounded-full z-10">
            <LoaderCircle className="size-8 text-primary animate-spin" />
          </div>
        )}

        <Image
          src={imageSrc ?? "/svgs/user.svg"}
          priority
          alt="profile img"
          fill
          className="object-cover rounded-full"
        />
      </div>

      <label className="cursor-pointer" htmlFor="profileInput">
        <input
          ref={fileInputRef}
          onChange={handleImageFileInputChange}
          type="file"
          accept="image/jpg,image/jpeg,image/png"
          className="hidden"
          multiple={false}
          id="profileInput"
          name="profileImage"
        />
      </label>
      <div className="flex flex-col gap-1 max-sm:text-center">
        <Button
          disabled={isPending}
          type="button"
          className="text-[17px] sm:text-xl capitalize font-semibold h-auto"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          {isPending ? (
            <LoaderCircle className="size-5 sm:size-6 animate-spin" />
          ) : (
            <Camera className="size-5 sm:size-6" />
          )}

          <span>{isPending ? "uploading..." : "change photo"}</span>
        </Button>
        {inputFileError && (
          <span className="text-destructive">{inputFileError}</span>
        )}
      </div>
    </form>
  );
}
