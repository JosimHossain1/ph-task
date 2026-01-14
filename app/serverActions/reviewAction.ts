"use server"

import dbConnect from "@/lib/dbConnect"
import Review from "@/models/reviewModel"
import Book from "@/models/bookModel"
import { revalidatePath } from "next/cache"

export async function addReviewAction(formData: FormData) {
  await dbConnect()

  const book = formData.get("book") as string
  const user = formData.get("user") as string
  const rating = Number(formData.get("rating"))
  const comment = formData.get("comment") as string

  if (!book || !user || !rating || !comment) {
    throw new Error("All fields are required")
  }

  await Review.create({
    book,
    user,
    rating,
    comment,
  })

  revalidatePath(`/browse/${book}`)
}


export async function getPendingReviews() {
  await dbConnect()

  return await Review.find({ status: "pending" })
    .populate("user", "name photo")
    .populate("book", "title")
    .sort({ createdAt: -1 })
    .lean()
}


export async function getApprovedReview(bookId: string) {
  await dbConnect();

  return await Review.find({
    book: bookId,
    status: "Approved", 
  })
    .sort({ createdAt: -1 })
    .lean();
}



export async function getAllReviews() {
  await dbConnect()

  return await Review.find().sort({ createdAt: -1 }).lean()
}


export async function updateReviewStatusAction(formData: FormData) {
  await dbConnect();

  const reviewId = formData.get("reviewId") as string;
  const status = formData.get("status") as "Approved" | "Rejected";

  if (!reviewId || !status) {
    throw new Error("Missing required fields");
  }

  const review = await Review.findById(reviewId);
  if (!review) throw new Error("Review not found");

  review.status = status;
  await review.save();

  if (status === "Approved") {
    const approvedReviews = await Review.find({
      book: review.book,
      status: "Approved",
    }

    );

    const totalReviews = approvedReviews.length;
    const avgRating =
      approvedReviews.reduce((sum, r) => sum + r.rating, 0) /
      totalReviews;

    await Book.findByIdAndUpdate(review.book, {
      totalReviews,
      avgRating,
    });
  } else {
    await Review.find({
      book: review.book,
      status: "Rejected",
    })
  }

  revalidatePath("/dashboard/manage-review");
  revalidatePath(`/browse-books/${review.book}`);
}
