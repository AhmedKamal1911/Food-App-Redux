"use client";

import { Button } from "@/components/ui/button";

import { updateProfileImageAction } from "@/lib/server/actions/user/update-profile-image-action";
import { uploadProfileImage } from "@/lib/queries/upload/upload-profile-image";
import { profileImageSchema } from "@/lib/validation/profile-image-schema";
import { Camera, LoaderCircle } from "lucide-react";

import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { UserInfo } from "../settings-tabs";
import { useSession } from "next-auth/react";

export function ProfileImageForm({
  profileImg,
}: {
  profileImg: UserInfo["image"];
}) {
  const [isPending, setIsPending] = useState(false);
  // FIXME: there is limit on upload profile image  route body Error: Body exceeded 1 MB limit.

  const session = useSession();
  const [currentProfileImg, setCurrentProfileImg] = useState<string | null>(
    profileImg
  );
  const [inputFileError, setInputFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearTempImgFromBrowserMemory = (tempProfileImg: string | null) => {
    if (tempProfileImg) {
      console.log("clearTempImgFromBrowserMemory", { tempProfileImg });
      URL.revokeObjectURL(tempProfileImg);
    }
  };
  function showError(error: string) {
    setInputFileError(error);
    toast.error(error);
  }
  async function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setIsPending(false);
    setInputFileError("");
    const file = e.target.files?.[0];
    const schemaResult = profileImageSchema.safeParse(file);
    let tempProfileImg: string | null = null;
    try {
      if (!schemaResult.success) {
        const fileErrorMsg = schemaResult.error.flatten().formErrors[0];
        throw new Error(fileErrorMsg);
      }
      // validation is successful

      tempProfileImg = URL.createObjectURL(schemaResult.data);

      setCurrentProfileImg(tempProfileImg);
      setIsPending(true);

      const uploadImageResponse = await uploadProfileImage(schemaResult.data);

      const uploadedImgURL = uploadImageResponse.url;

      const actionResponse = await updateProfileImageAction(uploadedImgURL);
      if (actionResponse.status === "success") {
        toast.success(actionResponse.message);
        // set the new image to reflect the update change
        setCurrentProfileImg(uploadedImgURL);
        clearTempImgFromBrowserMemory(tempProfileImg);
        session.update();
      } else {
        throw new Error(actionResponse.error.message);
      }
    } catch (error) {
      clearTempImgFromBrowserMemory(tempProfileImg);
      showError(
        error instanceof TypeError
          ? "Failed To Upload : Check Your Network Connection!"
          : error instanceof Error
            ? error.message
            : "Failed to upload image"
      );
      setCurrentProfileImg(profileImg);
    } finally {
      setIsPending(false);
    }
  }
  console.log({ component: currentProfileImg });
  return (
    <form className="flex max-sm:flex-col items-center gap-5 pb-2 w-full">
      <div className="rounded-full border-2 relative ">
        {isPending && (
          <div className="flex items-center justify-center absolute inset-0 bg-gray-800/80 rounded-full z-10">
            <LoaderCircle className="size-8 text-primary animate-spin" />
          </div>
        )}

        <Image
          src={currentProfileImg ?? "/svgs/user.svg"}
          priority
          alt="profile img"
          height={150}
          width={150}
          className="object-cover rounded-full size-[150px]"
        />
      </div>

      <label className="cursor-pointer" htmlFor="profileInput">
        <input
          ref={fileInputRef}
          onChange={handleInputChange}
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
