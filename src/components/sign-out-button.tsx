"use client";

import { signOut } from "next-auth/react"

export const SignOutButton = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  }

  return (
    <button
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center text-lg h-10 px-4"
      onClick={handleLogout}
    >
      Sign Out
    </button>
  );
};
