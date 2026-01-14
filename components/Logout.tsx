"use client";

import { logout } from "@/app/serverActions/auth";

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="px-4 py-2 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}