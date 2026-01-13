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
import { DeleteUserAction, getUsers, UpdateUserAction } from '@/app/serverActions/userAction'
import { UserType } from '@/types/UserType'
import { Badge } from '@/components/ui/badge'

const UserTable = async () => {
  
const users = await getUsers()
console.log(users)

  return (
    <div className="p-10">
      <table className="w-full border-collapse rounded-lg border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">User Name</th>
            <th className="border px-3 py-2 text-left">Email Address</th>
            <th className="border px-3 py-2 text-left">Role</th>
            <th className="border px-3 py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length ? (
            users.map((user : UserType) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{user.name}</td>
                <td className="border px-3 py-2">{user.email}</td>

                <td className="border px-3 py-2">  {user.role == "Admin" ? <Badge className='bg-green-100 border text-green-400'>{user.role}</Badge> : user.role}</td>

                <td className="border px-2 py-2 flex gap-2 justify-center">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="secondary" className='bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white hover:text-white'>Edit</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit User</SheetTitle>
                        <SheetDescription>
                          Make changes the User here. Click update User when you&apos;re done.
                        </SheetDescription>
                      </SheetHeader>
                      <Form action={UpdateUserAction}>
                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                          {/* Hidden User ID */}
                          <Input type="hidden" name="id" defaultValue={user._id} />

                          <div className="grid gap-3">
                            <Label htmlFor="name">User Name</Label>
                            <Input id="name" name="name" defaultValue={user.name} />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" defaultValue={user.email} />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" name="role" defaultValue={user.role} />
                          </div>

                        </div>

                        <SheetFooter>
                          <Button type="submit">Update User</Button>
                          <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </SheetClose>
                        </SheetFooter>
                      </Form>

                    </SheetContent>
                  </Sheet>

                  {/* Delete the User */}
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
                      <Form action={DeleteUserAction}>
                        <Input id="id" name="id" type='hidden' defaultValue={user._id} />
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
                No Users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div >
  )
}

export default UserTable
