import { getAllTutorial } from "@/app/serverActions/tutorialAction"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Video = {
  _id: string
  tutorialName: string
  genreName : string
  description: string
  videoUrl: string
}



const EmbeddedYoutubePage= async()  => {

  const videoTutorials = await getAllTutorial()

  return (
    <div className="p-6">
      <h1 className=" text-2xl font-semibold">Video Tutorials</h1>
      <Link href="/dashboard/manage-tutorials/add-tutorial"><Button className="my-6">Add New Tutorial</Button></Link>
       
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videoTutorials.map((video : Video) => (
          <div
            key={video._id}
            className="rounded-xl border bg-white shadow-sm overflow-hidden"
          >
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={video.videoUrl}
                title={video.videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4">
              <Badge>{video.genreName}</Badge>
              <h2 className="text-lg font-medium">{video.tutorialName}</h2>
              <p className="mt-1 text-sm text-gray-600">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmbeddedYoutubePage