"use client"
import { handleRoleChange } from "@/lib/userActions";
import { useState } from "react";
export default function RoleInput() {

  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    try {
      await handleRoleChange(role);
    }
    catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }

  return <div className="flex-col flex justify-left w-fit ">
    <div className="flex justify-between ">
      <div className="mx-2 inline">
        {" "}
        <input
          value="student"
          name="role"
          checked={role === "student"}
          onChange={(e) => setRole(e.target.value)}
          type="radio"
          required
          className=""
        />{" "}
        <label htmlFor="student">Student</label>
      </div>
      <div className="mx-2 inline">
        {" "}
        <input
          value="professor"
          name="role"
          checked={role === "professor"}
          onChange={(e) => setRole(e.target.value)}
          type="radio"
          required
          className=""
        />{" "}
        <label htmlFor="professor">Professor</label>
      </div>
      <div className="mx-2 inline">
        <input
          value="rewarder"
          name="role"
          onChange={(e) => setRole(e.target.value)}
          checked={role === "rewarder"}
          type="radio"
          required
          className=""
        />{" "}
        <label htmlFor="rewarder">Rewarder</label>
      </div>
    </div>
    <button onClick={handleClick} className="px-2 border">Confirm</button>
    <p className="text-red-600">{errorMessage}</p>

  </div>
}

