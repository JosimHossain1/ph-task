import dbConnect from "@/lib/dbConnect";
import shelfModel from "@/models/shelfModel";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;

  const findSingleShelf = await shelfModel.findById(id)
  return new Response(JSON.stringify({ message: "Shelf Goted", data: findSingleShelf }), { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;

  const deletedShelf = await shelfModel.findByIdAndDelete(id)
  return new Response(JSON.stringify({ message: "Shelf Deletd", data: deletedShelf }), { status: 200 })
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;
  const body = await req.json()

  const updatedShelf = await shelfModel.findByIdAndUpdate(id, { $set: body }, { new: true })
  return new Response(JSON.stringify({ message: "Shelf Updated", data: updatedShelf }), { status: 200 })
}
