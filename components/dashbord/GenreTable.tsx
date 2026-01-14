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

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DeletegenreAction, getAllGenre, UpdategenreAction } from '@/app/serverActions/genreAction'


const GenreTable = async() => {
const genres = await getAllGenre()


  return (
    <div className="py-5">
      <table className="w-full border-collapse rounded-lg border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Genre Name</th>
            <th className="border px-3 py-2">Genre Slug</th>
            <th className="border px-3 py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {genres.length ? (
            genres.map((genre) => (
              <tr key={genre._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{genre.genreName}</td>
                <td className="border px-3 py-2">{genre.slug}</td>


                <td className="border px-2 py-2 flex gap-2 justify-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="secondary" className='bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white hover:text-white'>Edit</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit Genre</SheetTitle>
                        <SheetDescription>
                          Make changes the Genre here. Click update Genre when you&apos;re done.
                        </SheetDescription>
                      </SheetHeader>
                      <Form action={UpdategenreAction}>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                          {/* Hidden Genre ID */}
                          <Input type="hidden" name="id" defaultValue={genre._id} />

                          <div className="grid gap-3">
                            <Label htmlFor="genreName">Genre Name</Label>
                            <Input id="genreName" name="genreName" defaultValue={genre.genreName} />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="slug">Genre Slug</Label>
                            <Input id="slug" name="slug" defaultValue={genre.slug} />
                          </div>

                        </div>

                        <SheetFooter>
                          <Button type="submit">Update Genre</Button>
                          <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </SheetClose>
                        </SheetFooter>
                      </Form>

                    </SheetContent>
                  </Sheet>

                  {/* Delete the Genre */}
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
                      <Form action={DeletegenreAction}>
                        <Input id="id" name="id" type='hidden' defaultValue={genre._id} />
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
                No Genres found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div >
  )
}

export default GenreTable
