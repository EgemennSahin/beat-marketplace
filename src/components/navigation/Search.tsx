"use client";

// components/Search.tsx
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchTerm === "") return;
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="form-control w-full lg:w-auto">
      <div className="input-group">
        <input
          type="text"
          placeholder="Beat ara"
          value={searchTerm}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered input-md lg:input-sm w-full lg:w-auto"
        />
        <button type="submit" className="btn btn-square btn-md lg:btn-sm">
          <MagnifyingGlassIcon className="p-1 text-neutral-content" />
        </button>
      </div>
    </form>
  );
}
