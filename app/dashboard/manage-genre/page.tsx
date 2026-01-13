
import GenreTable from '@/components/dashbord/manage-genre/GenreTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ManageGenrePage = () => {
  return (
    <div className='p-10'>
      <Link href="/dashboard/manage-genre/add-genre"> <Button>Add New Genre</Button></Link>
      <GenreTable/>
    </div>
  )
}

export default ManageGenrePage