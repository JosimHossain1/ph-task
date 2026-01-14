import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getCurrentUser = async () => {
  // await cookies() if TS thinks it's a Promise
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      name : string;
      email: string;
      role: "User" | "Admin";
    };
    return decoded;
  } catch (err) {
    return null;
  }
};
