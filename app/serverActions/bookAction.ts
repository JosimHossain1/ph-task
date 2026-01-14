"use server"

import dbConnect from "@/lib/dbConnect";
import bookModel from "@/models/bookModel";


export async function getAllBooks() {

  await dbConnect()
  const books = await bookModel.find().lean()
  return books

}


export async function getSingleBook(id: string) {
  await dbConnect();
  return await bookModel.findById(id).lean();
}


export async function BookAddFormAction(formData: FormData) {

  const bookName = formData.get("bookName") as string;
  const author = formData.get("author") as string;
  const genre = formData.get("genre") as string;
  const totalCopies = formData.get("totalCopies");
  const shelfLocation = formData.get("shelfLocation");
  const publishedYear = formData.get("publishedYear");


  const book = {
    bookName,
    author,
    genre,
    totalCopies,
    shelfLocation,
    publishedYear
  }


  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
  })

}


export async function UpdateBookAction(formData: FormData) {
  const id = formData.get("id") as string
  const bookName = formData.get("bookName") as string;
  const author = formData.get("author") as string;
  const genre = formData.get("genre") as string;
  const shelfLocation = formData.get("shelfLocation");
  const publishedYear = formData.get("publishedYear");


  const book = {
    bookName,
    author,
    genre,
    shelfLocation,
    publishedYear
  }


  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
  })
}

export async function deleteBookAction(formData: FormData) {
  const id = formData.get("id") as string
  console.log(id)

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`, { method: "DELETE" })
}