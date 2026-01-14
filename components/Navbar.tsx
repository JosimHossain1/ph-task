import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./Logout";


export default async function Navbar() {

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
          <>
            <ul className="space-x-2">
              <Link href="/browse-books" className="underline space-x-2">Browse Books</Link>
              <Link href="/my-library" className="underline space-x-2">My Library</Link>
            </ul>
            <LogoutButton />

          </>
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