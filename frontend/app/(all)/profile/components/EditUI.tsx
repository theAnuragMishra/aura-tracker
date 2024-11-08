"use client";

import { saveName, saveUserName } from "@/lib/profileActions";
import { useState } from "react";

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

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-5">Edit your profile!</h1>
      <div className="flex flex-col gap-2">
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
