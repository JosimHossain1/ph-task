import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/usersModel";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  await dbConnect()

  try {
    const findUser = await userModel.find();
    return new Response(JSON.stringify(findUser), { status: 200 })
  } catch (error) {
    console.log(error)
  }

}

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, password, ...rest } = await req.json()


  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);


  try {
    const userExit = await userModel.findOne({ email: email });

    if (userExit) {
      return new Response(JSON.stringify({ message: "User Already Exist" }), { status: 409 })
    } else {
      const createUser = await userModel.create({
        ...rest,
        email,
        password: hashPass
      });
      return new Response(JSON.stringify({ message: "User Created Successfully!", data: createUser }), { status: 201 })
    }
  } catch (error) {
    return new Response(JSON.stringify(error))
  }


}