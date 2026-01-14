import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "../Logout";


export default async function Navbar() {
  // 1. Check if the token cookie exists
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const isLoggedIn = !!token;

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <Link href="/" className="text-2xl font-bold">
        BookApp
      </Link>

      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <>
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-500  px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}