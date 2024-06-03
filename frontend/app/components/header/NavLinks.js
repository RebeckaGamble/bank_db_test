"use client";
import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function NavLinks() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = () => {
    handleLogout();
    router.push("/login");
  };
  return (
    <>
      <li>
        {isLoggedIn ? (
          <div className="flex flex-row gap-4">
            <button onClick={logoutHandler} className="hover:font-semibold">Logout</button>
            <Link href="/account" className="hover:font-semibold"> My account </Link>
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <Link href="/login" className="hover:font-semibold">Login</Link>
            <Link href="/create" className="hover:font-semibold">Create account </Link>
          </div>
        )}
      </li>
    </>
  );
}
