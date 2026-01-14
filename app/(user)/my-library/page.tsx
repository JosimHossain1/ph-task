"use client";

import React, { useState } from "react";
import { MoreVertical, Plus, BookOpen } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Types ---
type Status = "Want to Read" | "Currently Reading" | "Read";

interface Book {
  id: string;
  title: string;
  author: string;
  status: Status;
  progress: number;
}

const MOCK_BOOKS: Book[] = [
  { id: "1", title: "Atomic Habits", author: "James Clear", status: "Currently Reading", progress: 45 },
  { id: "2", title: "Deep Work", author: "Cal Newport", status: "Want to Read", progress: 0 },
  { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", status: "Read", progress: 100 },
];

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);

  const updateStatus = (id: string, status: Status) => {
    setBooks(books.map(b => b.id === id ? { ...b, status, progress: status === "Read" ? 100 : b.progress } : b));
  };

  const BookItem = ({ book }: { book: Book }) => (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white">
      {/* Small Book Icon Placeholder */}
      <div className="hidden sm:flex h-12 w-12 items-center justify-center bg-slate-100 rounded text-slate-400">
        <BookOpen size={20} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-slate-900 truncate">{book.title}</h3>
        <p className="text-sm text-slate-500">{book.author}</p>
      </div>

      <div className="hidden md:block w-32">
        <div className="flex justify-between text-[10px] mb-1">
          <span>Progress</span>
          <span>{book.progress}%</span>
        </div>
        <Progress value={book.progress} className="h-1" />
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="outline" className="hidden sm:inline-flex font-normal">
          {book.status}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => updateStatus(book.id, "Want to Read")}>Want to Read</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus(book.id, "Currently Reading")}>Currently Reading</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateStatus(book.id, "Read")}>Mark as Read</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Library</h1>
          <p className="text-slate-500 text-sm">You have {books.length} books in your collection.</p>
        </div>
        <Button size="sm">
          <Plus size={16} className="mr-2" /> Add Book
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6 h-auto p-0 bg-transparent gap-6 border-b rounded-none w-full justify-start">
          <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent shadow-none px-0 pb-2">All</TabsTrigger>
          <TabsTrigger value="reading" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent shadow-none px-0 pb-2">Reading</TabsTrigger>
          <TabsTrigger value="want" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent shadow-none px-0 pb-2">To Read</TabsTrigger>
          <TabsTrigger value="read" className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent shadow-none px-0 pb-2">Finished</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {books.map(book => <BookItem key={book.id} book={book} />)}
        </TabsContent>

        <TabsContent value="reading" className="space-y-3">
          {books.filter(b => b.status === "Currently Reading").map(book => <BookItem key={book.id} book={book} />)}
        </TabsContent>

        <TabsContent value="want" className="space-y-3">
          {books.filter(b => b.status === "Want to Read").map(book => <BookItem key={book.id} book={book} />)}
        </TabsContent>

        <TabsContent value="read" className="space-y-3">
          {books.filter(b => b.status === "Read").map(book => <BookItem key={book.id} book={book} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}