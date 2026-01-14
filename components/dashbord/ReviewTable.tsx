import { getAllReviews, updateReviewStatusAction } from "@/app/serverActions/reviewAction";
import Form from "next/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ReviewTable = async () => {
  const reviews = await getAllReviews();

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">All Reviews</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review: any) => (
          <div
            key={review._id}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            {/* User */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                {review.user?.name?.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{review.user?.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(review.createdAt).toDateString()}
                </p>
              </div>
            </div>

            {/* Book */}
            <div className="mt-4">
              <p className="text-sm text-gray-500">Book</p>
              <p className="font-medium">{review.book?.title}</p>
            </div>

            {/* Rating */}
            <div className="mt-3 flex gap-1">
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

            {/* Comment */}
            <p className="mt-3 text-sm text-gray-700 line-clamp-3">
              {review.comment}
            </p>

            {/* Status */}
            <span
              className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium
                ${
                  review.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : review.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {review.status}
            </span>

            {review.status === "Pending" && (
              <div className="mt-4 flex gap-3">
                <Form action={updateReviewStatusAction}>
                  <Input type="hidden" name="reviewId" value={review._id} />
                  <Input type="hidden" name="status" value="Approved" />
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">Approve</Button>
                </Form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewTable;
