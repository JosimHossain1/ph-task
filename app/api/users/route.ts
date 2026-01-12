import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/usersModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect()

  const findUser = await userModel.find();
  return new Response(JSON.stringify(findUser), { status: 200 })
}

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();

  const body = await req.json()

  const createUser = await userModel.create(body);
  return new Response(JSON.stringify({ message: "User created", data: createUser }), { status: 201 })
}