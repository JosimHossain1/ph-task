import dbConnect from "@/lib/dbConnect";
import shelfModel from "@/models/shelfModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect()

  const findShelf = await shelfModel.find();
  return new Response(JSON.stringify(findShelf), { status: 200 })
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json()

  const createShelf = await shelfModel.create(body);
  return new Response(JSON.stringify({ message: "Shelf created", data: createShelf }), { status: 201 })
}