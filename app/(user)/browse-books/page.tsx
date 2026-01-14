import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllBooks } from "@/app/serverActions/bookAction";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const BookPage = async() =>{

  const books = await getAllBooks()
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">📚 Book Collection</h1>

      <div className="grid grid-cols-4 gap-6">
        {books.map((book) => (
          <Card key={book._id} className="hover:shadow-lg transition">
            <CardHeader className="p-0">
              <Image
                src={book.image}
                alt={book.title}
                width={200}
                height={150}
                className="object-cover rounded-t-md"
              />
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              <CardTitle className="text-lg">{book.title}</CardTitle>

              <p className="text-sm text-muted-foreground">
                ✍️ {book.author}
              </p>

              <p className="text-sm line-clamp-3">
                {book.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="secondary">{book.category}</Badge>
                <Badge variant="outline">📅 {book.year}</Badge>
                <Badge>⭐ {book.rating}</Badge>
              </div>
            </CardContent>
            <Link href={`/browse-books/${book._id}`}><Button>View Details</Button></Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BookPage
