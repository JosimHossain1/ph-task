import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import userModel from "@/models/usersModel";
import dbConnect from "@/lib/dbConnect";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();

  const user = await userModel.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({
    id: user._id,
    name : user.name,
    email : user.email,
    role: user.role,
  });

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
  });

  return res;
}
