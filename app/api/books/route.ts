import dbConnect from "@/lib/dbConnect";
import bookModel from "@/models/bookModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect()

  const findBook = await bookModel.find();
  return new Response(JSON.stringify(findBook), { status: 200 })
}

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();

  const body = await req.json()

  const createBook = await bookModel.create(body);
  return new Response(JSON.stringify({ message: "Book created", data: createBook }), { status: 201 })
}