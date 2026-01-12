import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/usersModel";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;

  const findSingleUser = await userModel.findById(id)
  return new Response(JSON.stringify({ message: "User Goted", data: findSingleUser }), { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;

  const deletedUser = await userModel.findByIdAndDelete(id)
  return new Response(JSON.stringify({ message: "User Deletd", data : deletedUser}), { status: 204 })
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;
  const body = await req.json()

  const updatedUser = await userModel.findByIdAndUpdate(id, {$set : body}, {new : true})
  return new Response(JSON.stringify({ message: "User Updated", data : updatedUser }), { status: 200 })
}
