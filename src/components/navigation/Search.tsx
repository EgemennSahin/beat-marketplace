"use client";

// components/Search.tsx
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full lg:w-auto">
      <input
        type="text"
        placeholder="Beat ara"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered input-sm w-full lg:w-auto"
      />
    </form>
  );
}
