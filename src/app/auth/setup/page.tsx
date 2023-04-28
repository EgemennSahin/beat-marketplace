"use client";

import { insertUserIntoDatabase } from "@/helpers/database";
import { useSupabase } from "@/providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
export default function SelectRoleAndUsername() {
  const supabase = useSupabase();
  const router = useRouter();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const profilePhotoInputRef = React.useRef<HTMLInputElement>(null);

  const [role, setRole] = useState<"buyer" | "seller" | null>(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleUserDataUpload = async (userId: string) => {
    if (role && username) {
      try {
        const { data, error } = await supabase.from("users").insert([
          {
            id: userId,
            user_name: username,
            role,
          },
        ]);

        if (error) {
          throw error;
        }
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleProfilePhotoUpload = async (userId: string) => {
    if (profilePhoto) {
      try {
        const { data, error } = await supabase.storage
          .from("users")
          .upload(`${userId}/profile`, profilePhoto);

        if (error) {
          throw error;
        }
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleSubmit = async () => {
    const { data } = await supabase.auth.getUser();

    console.log("data", data);

    if (data.user && role) {
      try {
        await handleUserDataUpload(data.user.id);
        await handleProfilePhotoUpload(data.user.id);

        router.push("/"); // Redirect to the main page or any other page after successful completion
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">
        Select your role and enter a username
      </h1>

      <div className="mb-4">
        <button
          className={`btn ${role === "buyer" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setRole("buyer")}
        >
          Buyer
        </button>
        <button
          className={`btn ${
            role === "seller" ? "btn-primary" : "btn-ghost"
          } ml-4`}
          onClick={() => setRole("seller")}
        >
          Seller
        </button>
      </div>

      <input
        type="text"
        className="block w-full border rounded-md p-2 mb-4"
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        ref={profilePhotoInputRef}
        type="file"
        className="file-input"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setProfilePhoto(e.target.files[0]);
          }
        }}
      />

      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>

      {error && (
        <div className="mt-4 text-red-600">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
}
