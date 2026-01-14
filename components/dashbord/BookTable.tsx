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
import { deleteBookAction, UpdateBookAction } from '@/app/serverActions/bookAction'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const BookTable = ({books} : {books : BookType[]}) => {

  return (
    <div className="py-4">
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
            books.map((book : BookType) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{book.bookName}</td>
                <td className="border px-3 py-2">{book.author}</td>
                <td className="border px-3 py-2">{book.genre}</td>
                <td className="border px-3 py-2 text-center">{book.status}</td>
                <td className="border px-3 py-2 text-center">{book.totalCopies}</td>
                <td className="border px-3 py-2 text-center">{book.availableCopies}</td>
                <td className="border px-3 py-2 text-center">{book.totalReview}</td>
                <td className="border px-3 py-2 text-center">{book.avarageRating}</td>
                <td className="border px-2 py-2 flex gap-2 justify-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="secondary" className='bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white hover:text-white'>Edit</Button>
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
                  <Dialog>

                    <DialogTrigger asChild>
                      <Button variant="outline" className='bg-red-500 hover:bg-red-600 cursor-pointer text-white hover:text-white'>Delete</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Are you sure? Want to Delete?</DialogTitle>
                        <DialogDescription>
                          If you delete onece. you can not undo the item.
                        </DialogDescription>
                      </DialogHeader>
                      <Form action={deleteBookAction}>
                        <Input id="id" name="id" type='hidden' defaultValue={book._id} />
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline" className=' cursor-pointer'>Cancel</Button>
                          </DialogClose>
                          <Button type="submit" className='bg-red-600 hover:bg-red-700 cursor-pointer'>Confirm Delete</Button>
                        </DialogFooter>
                      </Form>
                    </DialogContent>
                  </Dialog>
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
    </div >
  )
}

export default BookTable
