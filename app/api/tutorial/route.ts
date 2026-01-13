import dbConnect from "@/lib/dbConnect";
import tutorialModel from "@/models/turotialModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect()

  const findTutorial = await tutorialModel.find();
  return new Response(JSON.stringify(findTutorial), { status: 200 })
}

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();

  const body = await req.json()

  const createTutorial = await tutorialModel.create(body);
  return new Response(JSON.stringify({ message: "Tutorial created", data: createTutorial }), { status: 201 })
}