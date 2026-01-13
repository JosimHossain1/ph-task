import dbConnect from "@/lib/dbConnect";
import reviewModel from "@/models/reviewModel";
import { NextRequest } from "next/server";

type Params = {
  params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;

  const findSingleReview = await reviewModel.findById(id)
  return new Response(JSON.stringify({ message: "Review Goted", data: findSingleReview }), { status: 200 })
}

export async function DELETE(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;

  const deletedReview = await reviewModel.findByIdAndDelete(id)
  return new Response(JSON.stringify({ message: "Review Deletd", data: deletedReview }), { status: 200 })
}


export async function PUT(req: NextRequest, context: Params) {
  await dbConnect();

  const { id } = await context.params;
  const body = await req.json()

  const updatedReview = await reviewModel.findByIdAndUpdate(id, { $set: body }, { new: true })
  return new Response(JSON.stringify({ message: "Review Updated", data: updatedReview }), { status: 200 })
}
