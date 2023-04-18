"use client";

// SignUp.tsx
import { useSupabase } from "@/providers/SupabaseProvider";
import React, { useEffect, useState } from "react";

export default function AuthenticationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { supabase } = useSupabase();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: "testing@example.com",
      password: "123456",
    });
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: "testing@example.com",
      password: "123456",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    if (error) {
      setShowModal(true);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center bg-base-300 py-4 px-12 rounded-md">
      {showModal && (
        <div className="absolute top-0 z-50 flex justify-center">
          <div className="alert alert-error">
            <div className="flex-1">
              <label className="text-xl font-semibold">Hata</label>
              <p>{error}</p>
            </div>
            <button
              className="alert-close"
              onClick={() => {
                setShowModal(false);
                setError(null);
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <form className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold">Kayıt Ol</h1>

        <div>
          <label className="block text-sm mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full border rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-2" htmlFor="password">
            Şifre
          </label>
          <input
            type="password"
            id="password"
            className="block w-full border rounded-md p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-md py-2"
        >
          Kayıt Ol
        </button>
      </form>

      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
