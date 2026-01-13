import dbConnect from "@/lib/dbConnect";
import shelfModel from "@/models/shelfModel";
import { NextRequest } from "next/server";

type Params = {
  params: Promise<{ id: string }>
}


export async function GET(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;

  const findSingleShelf = await shelfModel.findById(id)
  return new Response(JSON.stringify({ message: "Shelf Goted", data: findSingleShelf }), { status: 200 })
}

export async function DELETE(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;

  const deletedShelf = await shelfModel.findByIdAndDelete(id)
  return new Response(JSON.stringify({ message: "Shelf Deletd", data: deletedShelf }), { status: 200 })
}


export async function PUT(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;
  const body = await req.json()

  const updatedShelf = await shelfModel.findByIdAndUpdate(id, { $set: body }, { new: true })
  return new Response(JSON.stringify({ message: "Shelf Updated", data: updatedShelf }), { status: 200 })
}
