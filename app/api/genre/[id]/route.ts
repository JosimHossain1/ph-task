import dbConnect from "@/lib/dbConnect";
import genreModel from "@/models/genreModel";

import { NextRequest } from "next/server";
type Params = {
  params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;

  const findSingleGenre = await genreModel.findById(id)
  return new Response(JSON.stringify({ message: "Genre Goted", data: findSingleGenre }), { status: 200 })
}

export async function DELETE(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;

  const deletedGenre = await genreModel.findByIdAndDelete(id)
  return new Response(JSON.stringify({ message: "Genre Deletd", data: deletedGenre }), { status: 200 })
}


export async function PUT(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;
  const body = await req.json()

  const updatedGenre = await genreModel.findByIdAndUpdate(id, { $set: body }, { new: true })
  return new Response(JSON.stringify({ message: "Genre Updated", data: updatedGenre }), { status: 200 })
}
