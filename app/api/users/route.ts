import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/usersModel";
import { NextRequest, NextResponse } from "next/server"; 
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const findUser = await userModel.find();
    return NextResponse.json(findUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, password, ...rest } = await req.json();

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const userExit = await userModel.findOne({ email: email });

    if (userExit) {
      return NextResponse.json({ message: "User Already Exist" }, { status: 409 });
    } else {
      const createUser = await userModel.create({
        ...rest,
        email,
        password: hashPass,
      });
      return NextResponse.json(
        { message: "User Created Successfully!", data: createUser },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}