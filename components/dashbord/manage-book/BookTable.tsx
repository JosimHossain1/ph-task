'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

type Book = {
  _id: string
  bookName: string
  author: string
  genre: string
  status: string
  totalCopies: number
  availableCopies: number
  totalReviews: number
  averageRating: number
}

const BookTable = () => {
  const [books, setBooks] = useState<Book[]>([])
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
    <div className="p-4">
      <table className="w-full border-collapse rounded-lg border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Book Name</th>
            <th className="border px-3 py-2 text-left">Author</th>
            <th className="border px-3 py-2 text-left">Genre</th>
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
                <td className="border px-3 py-2 text-center">{book.status}</td>
                <td className="border px-3 py-2 text-center">{book.totalCopies}</td>
                <td className="border px-3 py-2 text-center">{book.availableCopies}</td>
                <td className="border px-3 py-2 text-center">{book.totalReviews}</td>
                <td className="border px-3 py-2 text-center">{book.averageRating}</td>
                <td className="border px-2 py-2 flex gap-2 justify-center">
                  <Button size="sm">Edit</Button>
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
