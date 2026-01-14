"use server"

import dbConnect from "@/lib/dbConnect"
import Book from "@/models/bookModel"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getAllBooks() {
  await dbConnect()
  return await Book.find()
    .sort({ createdAt: -1 })
    .lean()
}

export async function getSingleBook(id: string) {
  await dbConnect()
  return await Book.findById(id).lean()
}


export async function BookAddFormAction(formData: FormData) {
  await dbConnect()

  const bookName = formData.get("bookName") as string
  const author = formData.get("author") as string
  const genre = formData.get("genre") as string
  const description = formData.get("description") as string
  const coverImage = formData.get("coverImage") as string
  const totalPages = Number(formData.get("totalPages"))

  if (!bookName || !author || !genre || !description || !coverImage || !totalPages) {
    throw new Error("All fields are required")
  }

  await Book.create({
    bookName,
    author,
    genre,
    description,
    coverImage,
    totalPages,
  })

  revalidatePath("/dashboard/manage-books")
  redirect("/dashboard/manage-books")
}

export async function UpdateBookAction(formData: FormData) {
  await dbConnect()
  const id = formData.get("id") as string

  const bookName = formData.get("bookName") as string
  const author = formData.get("author") as string
  const genre = formData.get("genre") as string
  const description = formData.get("description") as string
  const totalPages = Number(formData.get("totalPages"))

  if (!id) throw new Error("Book ID missing")

  await Book.findByIdAndUpdate(id, {
    bookName,
    author,
    genre,
    description,
    totalPages,
  })

  revalidatePath("/dashboard/manage-books")
  redirect("/dashboard/manage-books")
}

export async function deleteBookAction(formData: FormData) {
  await dbConnect()
  const id = formData.get("id") as string
  if (!id) throw new Error("Book ID missing")

  await Book.findByIdAndDelete(id)

  revalidatePath("/dashboard/manage-books")
}
