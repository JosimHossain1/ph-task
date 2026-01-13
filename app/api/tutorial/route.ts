import dbConnect from "@/lib/dbConnect";
import tutorialModel from "@/models/turotialModel";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json()

  const createTutorial = await tutorialModel.create(body);
  return new Response(JSON.stringify({ message: "Tutorial created", data: createTutorial }), { status: 201 })
}