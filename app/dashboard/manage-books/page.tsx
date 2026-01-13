import BookDataTable from '@/components/dashbord/manage-book/BookTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ManageBookPage = () => {
  return (
    <div className='p-10'>
      <Link href="/dashboard/manage-books/add-book"> <Button>Add New Book</Button></Link>
      <BookDataTable/>
    </div>
  )
}

export default ManageBookPage