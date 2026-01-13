import dbConnect from "@/lib/dbConnect";
import bookModel from "@/models/bookModel";
import { NextRequest } from "next/server";

type Params = {
  params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;

  const findSingleBook = await bookModel.findById(id)
  return new Response(JSON.stringify({ message: "Book Goted", data: findSingleBook }), { status: 200 })
}

export async function DELETE(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;

  const deletedBook = await bookModel.findByIdAndDelete(id)
  return new Response(JSON.stringify({ message: "Book Deletd", data: deletedBook }), { status: 200 })
}


export async function PUT(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;
  const body = await req.json()

  const updatedBook = await bookModel.findByIdAndUpdate(id, { $set: body }, { new: true })
  return new Response(JSON.stringify({ message: "Book Updated", data: updatedBook }), { status: 200 })
}
