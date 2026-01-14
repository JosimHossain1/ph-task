import { getSingleBook } from "@/app/serverActions/bookAction";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Form from "next/form";
import { addReviewAction, getApprovedReview } from "@/app/serverActions/reviewAction";
import { Input } from "@/components/ui/input";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface RatingData {
  average: number;
  totalReviews: number;
  distribution: {
    stars: number;
    count: number;
  }[];
}

const ratingData: RatingData = {
  average: 4.6,
  totalReviews: 124,
  distribution: [
    { stars: 5, count: 82 },
    { stars: 4, count: 28 },
    { stars: 3, count: 9 },
    { stars: 2, count: 3 },
    { stars: 1, count: 2 },
  ],
};



const singleBookPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {

  const { id } = await params
  const book = await getSingleBook(id)

  const currentUser = await getCurrentUser();

  const approvedReview = await getApprovedReview(id)
  const maxCount = Math.max(...ratingData.distribution.map((d) => d.count));

  return (
    <div className="mx-auto px-32 py-10">

      <Link href="/browse-books">Back to Book</Link>

      <Card className="p-6">
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="flex justify-center">
            <Image
              src={book.coverImage}
              alt={book.bookName}
              width={350}
              height={450}
              className="rounded-lg object-cover shadow-md"
            />
          </div>

          {/* Book Info */}
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-3xl font-bold">{book.bookName}</h1>

            <p className="text-muted-foreground text-lg">
              by <span className="font-medium">{book.author}</span>
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge>{book.category}</Badge>
              <Badge variant="outline">⭐ {book.rating}</Badge>
              <Badge variant="secondary">📅 {book.year}</Badge>
            </div>

            <Separator />

            <p className="leading-relaxed text-sm">
              {book.description}
            </p>

            <Separator />

            {/* Extra Information */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="font-semibold">Pages:</span> {book.totalPages}
              </p>
              <p>
                <span className="font-semibold">Publisher:</span>{" "}
                {book.publisher}
              </p>
              <p>
                <span className="font-semibold">Language:</span>{" "}
                {book.language}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button>📖 Read Now</Button>
              <Button variant="outline">⭐ Add to Favorites</Button>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Review Writing Box */}

      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <Form action={addReviewAction}>
            <div>
              <p className="mb-2 text-sm font-medium">Rating</p>
              <Input type="hidden" name="book" defaultValue={book._id} />
              <Input type="hidden" name="user" defaultValue={currentUser?.id} />
              <Select name="rating">
                <SelectTrigger>
                  <SelectValue placeholder="Select rating (1–5)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">★★★★★ (5)</SelectItem>
                  <SelectItem value="4">★★★★☆ (4)</SelectItem>
                  <SelectItem value="3">★★★☆☆ (3)</SelectItem>
                  <SelectItem value="2">★★☆☆☆ (2)</SelectItem>
                  <SelectItem value="1">★☆☆☆☆ (1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Your Review</p>
              <Textarea
                name="comment"
                placeholder="Write your honest review about this book..."
                rows={4}
              />
            </div>
            <Button className="w-full" type="submit">Submit Review</Button>
          </Form>

        </CardContent>
      </Card>


      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Average Rating */}
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold">
              {ratingData.average.toFixed(1)}
            </div>

            <div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i <= Math.round(ratingData.average)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                      }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {approvedReview.length} reviews
              </p>
            </div>
          </div>



          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingData.distribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="w-10 text-sm">{item.stars}★</span>

                <Progress
                  value={(item.count / maxCount) * 100}
                  className="h-2"
                />

                <span className="w-8 text-sm text-muted-foreground">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>


      <div>
        {
          approvedReview.map(review => (
            <Card className="my-5">
              <CardContent className="p-5 space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        dfgdf
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">dfgdf</p>
                      <p className="text-xs text-muted-foreground">{review.createAt}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm leading-relaxed">{review.comment}</p>
              </CardContent>
            </Card>
          ))
        }
      </div>




    </div>
  );
}


export default singleBookPage
