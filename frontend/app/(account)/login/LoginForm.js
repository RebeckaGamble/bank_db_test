"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginUser, setSessionToken, setIsLoggedIn } = useAuthContext();
  const router = useRouter();

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Wrong username or password.");
      return;
    }

    try {
      const { sessionToken } = await loginUser(username, password);
      setIsLoggedIn(true);
      setSessionToken(sessionToken);

      router.push("/account");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Failed to login");
    }
  };

  return (
    <div className="px-4 w-full pt-10 xl:pt-40 ">
     <div className="flex bg-[#fff] dark:bg-[#414142] flex-col max-w-[300px] sm:border sm:border-slate-200 h-auto xl:max-w-[500px] mx-auto shadow-lg px-4 py-6 md:px-8 md:py-10">
        <h3 className="font-semibold pb-6 text-center text-xl xl:text-2xl md:pb-10">
          Login to your user account
        </h3>
        <form
          action=""
          onSubmit={handleLoginUser}
          className="flex flex-col flex-1 mx-auto w-full max-w-[360px]"        >
          <label htmlFor="username" className="font-semibold">
            Username:{" "}
          </label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="border bordre-slate-500 px-2 py-1 mb-2 dark:bg-[#121212]"
          />
          <label htmlFor="password" className="font-semibold">
            Password:{" "}
          </label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="border bordre-slate-500 px-2 py-1 mb-2 dark:bg-[#121212]"
          />

          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mt-6 flex justify-end">
            <button className="max-w-fit px-6 py-2 text-white dark:bg-[#121212] hover:font-semibold">Log in</button>
          </div>
        </form>

        <div className="pt-4 text-center">
          <p>
            Don't have an account? Go to{" "}
            <Link href="/create" className="underline text-blue-700 dark:text-blue-300">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
