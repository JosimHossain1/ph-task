import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/usersModel";
import bookModel from "@/models/bookModel";
import genreModel from "@/models/genreModel";


export async function GET() {
  try {
    await dbConnect();

    const totalBooks = await bookModel.countDocuments();
    const totalUsers = await userModel.countDocuments();
    const totalGenres = await genreModel.countDocuments();

    return NextResponse.json({
      totalBooks,
      totalUsers,
      totalGenres,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
