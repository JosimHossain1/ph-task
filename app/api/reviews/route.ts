import dbConnect from "@/lib/dbConnect";
import reviewModel from "@/models/reviewModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect()

  const findReview = await reviewModel.find();
  return new Response(JSON.stringify(findReview), { status: 200 })
}

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();

  const body = await req.json()

  const createReview = await reviewModel.create(body);
  return new Response(JSON.stringify({ message: "Review created", data: createReview }), { status: 201 })
}