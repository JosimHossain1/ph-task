"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface Book {
  _id: string;
  bookName: string;
  author: string;
  genre: string;
  cover: string;
  rating: number;
}


export default function BrowseBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState([]);



  useEffect( () => {
      const fetchBook = async ()=>{
          const res = await fetch("http://localhost:3000/api/books")
          const booksData = await res.json()
          setBooks(booksData);
      }

        const fetchGenre = async ()=>{
          const res = await fetch("http://localhost:3000/api/genre")
          const allGenres = await res.json()
          setGenres(allGenres);
      }


      fetchBook()
      fetchGenre()
    
  }, []);

  console.log(genres)
  console.log(selectedGenre)

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.bookName.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="p-6 bg-[#F9F7F6] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Discover Books</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <Input
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />

        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book._id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <img
                  src={book.cover}
                  alt={book.bookName}
                  className="w-full h-64 object-cover rounded-md mb-2"
                />
                <CardTitle className="text-lg">{book.bookName}</CardTitle>
                <CardDescription className="text-sm text-gray-500">{book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Genre: {book.genre}</p>
                <p className="text-sm text-gray-600">Rating: {book.rating} ⭐</p>
              </CardContent>
              <CardFooter>
                <Link href={`browse/${book._id}`}><Button>View Details</Button></Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
