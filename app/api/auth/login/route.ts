import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import userModel from "@/models/usersModel";
import dbConnect from "@/lib/dbConnect";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const res = NextResponse.json({ 
      success: true, 
      user: { name: user.name, role: user.role } 
    });

    // Set cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      // secure: true only in production (HTTPS)
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}