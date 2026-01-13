import dbConnect from "@/lib/dbConnect";
import reviewModel from "@/models/reviewModel";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;

  const findSingleReview = await reviewModel.findById(id)
  return new Response(JSON.stringify({ message: "Review Goted", data: findSingleReview }), { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;

  const deletedReview = await reviewModel.findByIdAndDelete(id)
  return new Response(JSON.stringify({ message: "Review Deletd", data: deletedReview }), { status: 200 })
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;
  const body = await req.json()

  const updatedReview = await reviewModel.findByIdAndUpdate(id, { $set: body }, { new: true })
  return new Response(JSON.stringify({ message: "Review Updated", data: updatedReview }), { status: 200 })
}
