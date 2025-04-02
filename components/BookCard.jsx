import React from 'react';
import { FaUser, FaCalendar, FaBook } from 'react-icons/fa';

const BookCard = ({ book }) => {

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 font-geist-sans">{book.title}</h2>
        <span className="text-sm text-gray-500">{`ID: ${book.id.slice(0, 8)}...`}</span>
      </div>

      <div className="flex items-center gap-2 mb-3 text-gray-600">
        <FaUser className="text-blue-500" />
        <span className="font-medium">{book.author}</span>
      </div>

      <div className="flex items-center gap-2 mb-4 text-gray-600">
        <FaCalendar className="text-blue-500" />
        <span>{formatDate(book.published_date)}</span>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>

      <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t">
        <span>Created: {formatDate(book.created_at)}</span>
        <span>Updated: {formatDate(book.updated_at)}</span>
      </div>
    </div>
  );
};

export default BookCard;