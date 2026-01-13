import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/usersModel";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";


export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();


  try {
    const exitedUser = await userModel.findOne({ email: email });

    console.log(exitedUser)
    if (!exitedUser) {
      return new Response(JSON.stringify({ message: "Invalid Credential!" }), { status: 409 });
    }

    const matchedPass = await bcrypt.compare(password, exitedUser.password);

    if (!matchedPass) {
      return new Response(JSON.stringify({ message: "Invalid Credential!" }), { status: 409 });
    }


    const tokenData = {
      id: exitedUser._id,
      email: exitedUser.email
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" })

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/"
    });

    return new Response(JSON.stringify({ message: "Logged In Success" }), { status: 409 })

  } catch (error) {
    return new Response(JSON.stringify({ message: "Logged In Success" }), { status: 409 })
  }
}