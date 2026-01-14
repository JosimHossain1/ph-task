import { getSingleBook } from "@/app/serverActions/bookAction";
import Image from "next/image";

 const Page = async({
  params,
}: {
  params: Promise<{ id: string }>
}) => {

  const { id } = await params
  const book = await getSingleBook(id)

  return (
    <div className="min-h-screen bg-[#F6F4F1] px-4 py-12">

      {
        !book ? <div className="min-h-screen flex items-center justify-center bg-[#F6F4F1] px-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800">
          📚 Book Not Found
        </h1>
        <p className="text-gray-600 mt-3">
          The book you are looking for doesn’t exist or may have been removed.
        </p>

        <a
          href="/books"
          className="inline-block mt-6 px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          Browse Books
        </a>
      </div>
    </div> : <div className="mx-auto max-w-6xl">
        
        {/* Main Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          
          {/* Book Cover */}
          <div className="flex justify-center">
            <div className="relative w-56 h-80 rounded-2xl overflow-hidden shadow-md">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* Title & Author */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {book.title}
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                by {book.author}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full">
                {book.genre}
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full">
                ⭐ {book.rating} / 5
              </span>
            </div>

            {/* Description */}
            {book.description && (
              <p className="text-gray-600 leading-relaxed text-base">
                {book.description}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition">
                Want to Read
              </button>
              <button className="px-6 py-2 rounded-full border border-purple-200 text-purple-700 hover:bg-purple-50 transition">
                Currently Reading
              </button>
              <button className="px-6 py-2 rounded-full text-gray-600 hover:bg-gray-100 transition">
                Read
              </button>
            </div>

          </div>
        </div>

        {/* Cozy Footer Section */}
        <div className="mt-12 text-center text-sm text-gray-500">
          ☕ Find a quiet corner, open a book, and enjoy the moment.
        </div>
      </div>
      }
      
    </div>
  );
}

export default Page
