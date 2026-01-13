import dbConnect from "@/lib/dbConnect";
import tutorialModel from "@/models/turotialModel";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;

  const findSingleTutorial = await tutorialModel.findById(id)
  return new Response(JSON.stringify({ message: "Tutorial Goted", data: findSingleTutorial }), { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;

  const deletedTutorial = await tutorialModel.findByIdAndDelete(id)
  return new Response(JSON.stringify({ message: "Tutorial Deletd", data: deletedTutorial }), { status: 200 })
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = await params;
  const body = await req.json()

  const updatedTutorial = await tutorialModel.findByIdAndUpdate(id, { $set: body }, { new: true })
  return new Response(JSON.stringify({ message: "Tutorial Updated", data: updatedTutorial }), { status: 200 })
}
