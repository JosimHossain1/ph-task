"use client";

import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  };

  return logout;
}
