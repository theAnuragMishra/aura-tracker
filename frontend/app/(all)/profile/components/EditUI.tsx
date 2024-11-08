"use client";

import { saveName, saveUserName, uploadAvatar } from "@/lib/profileActions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function EditUI({
  data,
}: {
  data: {
    id: number;
    created_at: string;
    username: string;
    full_name: string;
    avatar_url: string;
    role: string;
    aura: number;
  };
}) {
  // console.log(data);

  const [name, setName] = useState(data.full_name);
  const [username, setUserName] = useState(data.username);
  const [nameSaving, setNameSaving] = useState(false);
  const [usernameSaving, setUserNameSaving] = useState(false);
  const [currentName, setCurrentName] = useState(data.full_name);
  const [currentUserName, setCurrentUserName] = useState(data.username);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const handleSaveName = async () => {
    if (currentName === name) return;
    // console.log(name);
    setNameSaving(true);
    await saveName(name);
    setCurrentName(name);
    setNameSaving(false);
  };
  const handleSaveUserName = async () => {
    if (currentUserName === username || !username) return;
    // console.log(username);
    setUserNameSaving(true);
    try {
      await saveUserName(username);
      setCurrentUserName(username);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
    }

    setUserNameSaving(false);
  };

  const handleUploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Avatar size must be 5mb or less");
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `${data.id}-${Math.random()}.${fileExt}`;

      await uploadAvatar(filePath, file);
      router.refresh();
      // onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-5">Edit your profile!</h1>
      <div className="flex flex-col gap-2 items-center">
        <div className="mb-1">
          {data.avatar_url ? (
            <Image
              src={data.avatar_url}
              alt="profile picture"
              width="100"
              height="100"
              className="rounded-full"
            />
          ) : (
            <FaUser className="w-[100px] h-[100px] rounded-full" />
          )}
          <div>
            <label
              className="button primary block bg-white text-black rounded-md px-2 py-1 text-center mt-3"
              htmlFor="single"
            >
              {uploading ? "Uploading ..." : "Upload"}
            </label>
            <input
              style={{
                visibility: "hidden",
                position: "absolute",
              }}
              type="file"
              id="single"
              accept="image/*"
              onChange={handleUploadAvatar}
              disabled={uploading}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            id="name"
            className="text-black px-2 py-1 rounded-md w-[200px]"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMessage("");
            }}
          />
          <button
            type="button"
            className="bg-white text-black px-2 py-1 rounded-md"
            onClick={handleSaveName}
            disabled={nameSaving}
          >
            {nameSaving ? "Saving..." : "Save"}
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            id="name"
            className="text-black px-2 py-1 rounded-md w-[200px]"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
              setErrorMessage("");
            }}
          />
          <button
            type="button"
            className="bg-white text-black px-2 py-1 rounded-md"
            onClick={handleSaveUserName}
            disabled={usernameSaving}
          >
            {usernameSaving ? "Saving..." : "Save"}
          </button>
        </div>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
}
