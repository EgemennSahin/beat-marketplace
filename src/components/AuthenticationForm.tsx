"use client";

// SignUp.tsx
import { useSupabase } from "@/providers/SupabaseProvider";
import React, { useEffect, useState } from "react";

export default function AuthenticationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const { supabase } = useSupabase();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: email,
      password: password,
    });
  };

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError("Hatalı email veya şifre");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSubmit = async () => {
    if (mode === "signup") {
      await handleSignUp();
    } else {
      await handleLogin();
    }
  };

  const toggleMode = () => {
    if (mode === "signup") {
      setMode("login");
    } else {
      setMode("signup");
    }
  };

  useEffect(() => {
    if (error) {
      setShowModal(true);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center">
      {showModal && (
        <div className="absolute top-0 z-50 flex justify-center">
          <div className="alert alert-error">
            <div className="inline-block">
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-4 mt-8 bg-base-300 py-4 px-12 rounded-md"
      >
        <h1 className="text-3xl font-semibold">
          {mode == "signup" ? "Kayıt Ol" : "Giriş Yap"}
        </h1>

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
        <div className="flex flex-col mt-4">
          <button type="submit" className="btn btn-primary">
            {mode == "signup" ? "Kayıt Ol" : "Giriş Yap"}
          </button>

          <div className="divider"> Ya da </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggleMode();
            }}
            className="btn btn-ghost self-center"
          >
            {mode == "signup" ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </div>
      </form>
    </div>
  );
}
