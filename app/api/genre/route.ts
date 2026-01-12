import dbConnect from "@/lib/dbConnect";
import genreModel from "@/models/genreModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect()

  const findGenre = await genreModel.find();
  return new Response(JSON.stringify(findGenre), { status: 200 })
}

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();

  const body = await req.json()

  const createdGenre = await genreModel.create(body);
  return new Response(JSON.stringify({ message: "Genre created", data: createdGenre }), { status: 201 })
}