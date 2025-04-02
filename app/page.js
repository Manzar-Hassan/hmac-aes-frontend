"use client";

import Button from "../components/Button";
import BookCard from "../components/BookCard";
import AddBookModal from "../components/AddBookModal";
import { getBooks, addBook } from "../utils/api";
import React, { useState } from "react";
import { FaBook, FaPlus } from "react-icons/fa";

const Page = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const fetchAllBooks = async () => {
    setIsLoading(true);
    try {
      const result = await getBooks();
      if (result) {
        setBooks(result);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = async (bookData) => {
    setIsAdding(true);
    try {
      const result = await addBook(bookData);
      if (result) {
        await fetchAllBooks();
        setIsModalOpen(false);
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 mb-8">
          <Button
            name="Get Books"
            onClick={fetchAllBooks}
            icon={FaBook}
            disabled={isLoading}
            loading={isLoading}
          />
          <Button
            name="Add Book"
            onClick={() => setIsModalOpen(true)}
            icon={FaPlus}
            disabled={isLoading}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[200px] bg-white rounded-lg shadow-sm border border-gray-200">
            <FaBook className="text-gray-400 text-4xl mb-3" />
            <p className="text-gray-500 text-lg">No books to show</p>
            <p className="text-gray-400 text-sm mt-1">Click "Get Books" to fetch the book list</p>
          </div>
        )}

        <AddBookModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBook}
          isLoading={isAdding}
        />
      </div>
    </main>
  );
};

export default Page;