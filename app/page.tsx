"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-black text-white px-3">
      <Image
        src="/logo.svg"
        width={150}
        height={150}
        alt="Neptn logo"
        className="mb-8"
      />
      <h1 className="text-5xl lg:text-7xl text-center font-thin mb-4">
        Take Control of <br /> Your Digital Assets
      </h1>
      <p className="text-sm text-center mb-8">
        Get ready for the next generation crypto platform. Enter your email to
        join early access.
      </p>
      <form
        className="flex flex-col lg:flex-row items-center gap-4 mb-8"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          id="email"
          name="email"
          placeholder="lewis.hamilton@ferrari.com"
          required
          className="w-80 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-full border border-gray-300 text-white hover:bg-white hover:text-black transition cursor-pointer"
        >
          Subscribe
        </button>
        {status === "success" && (
          <p className="text-sm">Thanks for your subscription ✅</p>
        )}
        {status === "error" && (
          <p className="text-sm">Error, please try again ❌</p>
        )}
      </form>
    </main>
  );
}
