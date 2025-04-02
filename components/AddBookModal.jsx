import React, { useState, useEffect } from 'react';
import Button from './Button';
import { FaSave, FaTimes } from 'react-icons/fa';

const AddBookModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const initialBookData = {
    title: '',
    author: '',
    description: '',
    published_date: ''
  };

  const [bookData, setBookData] = useState(initialBookData);

  useEffect(() => {
    if (!isOpen) {
      setBookData(initialBookData);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookData);
  };

  const handleClose = () => {
    setBookData(initialBookData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                disabled={isLoading}
                className="w-full p-2 border border-gray-300 rounded-md"
                value={bookData.title}
                onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                required
                disabled={isLoading}
                className="w-full p-2 border border-gray-300 rounded-md"
                value={bookData.author}
                onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                disabled={isLoading}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="3"
                value={bookData.description}
                onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
              <input
                type="date"
                required
                disabled={isLoading}
                className="w-full p-2 border border-gray-300 rounded-md"
                value={bookData.published_date}
                onChange={(e) => setBookData({ ...bookData, published_date: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              name="Save"
              type="submit"
              icon={FaSave}
              variant="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            />
            <Button
              name="Cancel"
              onClick={handleClose}
              icon={FaTimes}
              variant="secondary"
              fullWidth
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;

