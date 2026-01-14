export const dynamic = "force-dynamic"

import { getAllBooks } from '@/app/serverActions/bookAction'
import BookDataTable from '@/components/dashbord/BookTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ManageBookPage = async () => {

  const books = await getAllBooks()

  return (
    <div className='p-10'>
      <Link href="/dashboard/manage-books/add-book"> <Button>Add New Book</Button></Link>
      <BookDataTable books={books}/>
    </div>
  )
}

export default ManageBookPage