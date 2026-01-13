import { GetGenres } from '@/app/serverActions/genreAction'
import { AddTutorialAction } from '@/app/serverActions/tutorialAction'
import { Button } from '@/components/ui/button'
import { GenreType } from '@/types/GenreType'
import Form from 'next/form'

const AddTutorialPage = async () => {

  const genres = await GetGenres()

  return (
    <div className="max-w-xl p-6">
      <h1 className="mb-6 text-xl font-semibold">Add YouTube Tutorial</h1>

      <Form action={AddTutorialAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Tutorial Name
          </label>
          <input
            name="tutorialName"
            required
            className="w-full rounded-md border px-3 py-2"
            placeholder="Clean Code Book Review"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Genre / Category
          </label>
          <select
            name="genreName"
            id="genreName"
            required
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="" disabled>Select a genre</option>

            {genres.map((genre: GenreType) => (
              <option key={genre._id} value={genre.genreName}>
                {genre.genreName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Short description about this video"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            YouTube Embed URL
          </label>
          <input
            name="videoUrl"
            required
            className="w-full rounded-md border px-3 py-2"
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
          />
        </div>

        <Button
          type="submit"
          className='mt-5'
        >
          Add Tutorial
        </Button>
      </Form>
    </div>
  )
}

export default AddTutorialPage