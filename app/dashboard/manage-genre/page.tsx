
import { getAllGenre } from '@/app/serverActions/genreAction'
import GenreTable from '@/components/dashbord/GenreTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ManageGenrePage = async () => {

const genres = await getAllGenre()

  return (
    <div className='p-10'>
      <Link href="/dashboard/manage-genre/add-genre"> <Button>Add New Genre</Button></Link>
      <GenreTable genres={genres}/>
    </div>
  )
}

export default ManageGenrePage