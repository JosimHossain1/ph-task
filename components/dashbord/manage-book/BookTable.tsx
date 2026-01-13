'use client'

import { useEffect, useState } from 'react'
import { BookType } from '@/types/BookType'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Form from 'next/form'
import { UpdateBookAction } from '@/app/serverActions/bookAction'

const BookTable = () => {
  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/books')
        const data = await res.json()
        setBooks(data)
      } catch (error) {
        console.error('Failed to fetch books', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) {
    return <p className="p-4">Loading books...</p>
  }

  return (
    <div className="py-4">
      <table className="w-full border-collapse rounded-lg border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Book Name</th>
            <th className="border px-3 py-2 text-left">Author</th>
            <th className="border px-3 py-2 text-left">Genre</th>
            <th className="border px-3 py-2 text-left">Shelf</th>
            <th className="border px-3 py-2 text-left">Year</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Total</th>
            <th className="border px-3 py-2">Available</th>
            <th className="border px-3 py-2">Reviews</th>
            <th className="border px-3 py-2">Rating</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {books.length ? (
            books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{book.bookName}</td>
                <td className="border px-3 py-2">{book.author}</td>
                <td className="border px-3 py-2">{book.genre}</td>
                <td className="border px-3 py-2">{book.shelfLocation}</td>
                <td className="border px-3 py-2">{book.publishedYear}</td>
                <td className="border px-3 py-2 text-center">{book.status}</td>
                <td className="border px-3 py-2 text-center">{book.totalCopies}</td>
                <td className="border px-3 py-2 text-center">{book.availableCopies}</td>
                <td className="border px-3 py-2 text-center">{book.totalReview}</td>
                <td className="border px-3 py-2 text-center">{book.avarageRating}</td>
                <td className="border px-2 py-2 flex gap-2 justify-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="secondary" className='bg-yellow-500'>Edit</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit Book</SheetTitle>
                        <SheetDescription>
                          Make changes the book here. Click update book when you&apos;re done.
                        </SheetDescription>
                      </SheetHeader>
                      <Form action={UpdateBookAction}>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                          {/* Hidden book ID */}
                          <Input type="hidden" name="id" defaultValue={book._id} />

                          <div className="grid gap-3">
                            <Label htmlFor="bookName">Book Name</Label>
                            <Input id="bookName" name="bookName" defaultValue={book.bookName} />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="author">Author</Label>
                            <Input id="author" name="author" defaultValue={book.author} />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="genre">Genre</Label>
                            <Input id="genre" name="genre" defaultValue={book.genre} />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="shelfLocation">Shelf Location</Label>
                            <Input id="shelfLocation" name="shelfLocation" defaultValue={book.shelfLocation} />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="publishedYear">Publication Year</Label>
                            <Input
                              id="publishedYear"
                              name="publishedYear"
                              type="number"
                              defaultValue={book.publishedYear}
                            />
                          </div>
                        </div>

                        <SheetFooter>
                          <Button type="submit">Update Book</Button>
                          <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </SheetClose>
                        </SheetFooter>
                      </Form>

                    </SheetContent>
                  </Sheet>

                  {/* Delete the book */}
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center py-4">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BookTable
