// app/dashboard/reviews/page.tsx
import Image from "next/image"

type Review = {
  _id: string
  bookName: string
  userName: string
  userAvatar?: string
  rating: number
  reviewDes: string
  status: "Pending" | "Approved" | "Rejected"
  createdAt: string
}

const reviews: Review[] = [
  {
    _id: "1",
    bookName: "Clean Code",
    userName: "John Doe",
    rating: 5,
    reviewDes: "Excellent book for writing maintainable code.",
    status: "Approved",
    createdAt: "2025-01-10",
  },
  {
    _id: "2",
    bookName: "You Don’t Know JS",
    userName: "Jane Smith",
    rating: 4,
    reviewDes: "Very deep explanation, a bit hard for beginners.",
    status: "Pending",
    createdAt: "2025-01-12",
  },
]

export default function ReviewPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Book Reviews</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                {review.userName.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{review.userName}</p>
                <p className="text-xs text-gray-500">
                  {new Date(review.createdAt).toDateString()}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">Book</p>
              <p className="font-medium">{review.bookName}</p>
            </div>

            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>

            <p className="mt-3 text-sm text-gray-700 line-clamp-3">
              {review.reviewDes}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  review.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : review.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {review.status}
              </span>

              <div className="flex gap-2">
                <button className="rounded-md bg-green-600 px-3 py-1 text-xs text-white">
                  Approve
                </button>
                <button className="rounded-md bg-red-600 px-3 py-1 text-xs text-white">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
