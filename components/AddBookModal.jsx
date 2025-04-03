import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import {
  FaSave,
  FaTimes,
  FaBook,
  FaUser,
  FaCalendar,
  FaAlignLeft,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const initialBookData = {
  title: "",
  author: "",
  description: "",
  published_date: "",
};

const AddBookModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [bookData, setBookData] = useState(initialBookData);
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);
  const titleInputRef = useRef(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setBookData(initialBookData);
      setErrors({});
    } else {
      // Focus the title input when modal opens
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!bookData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!bookData.author.trim()) {
      newErrors.author = "Author is required";
    }

    if (!bookData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!bookData.published_date) {
      newErrors.published_date = "Published date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(bookData);
    }
  };

  const handleClose = () => {
    setBookData(initialBookData);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Modern header with subtle gradient and pattern */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-90"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTE4IDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0xOCAxOGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptMTggMGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptMTggMGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

              <div className="relative p-8 text-white">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3.5 rounded-xl mr-5 shadow-lg">
                    <FaBook className="text-2xl text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      Add New Book
                    </h2>
                    <p className="mt-2 text-indigo-100 text-sm font-medium">
                      Fill in the details to add a new book to your collection
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form content */}
            <form onSubmit={handleSubmit} className="p-8 pt-6">
              <div className="space-y-6">
                {/* Title Field */}
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                    <FaBook className="mr-2 text-indigo-500" size={18} /> Title
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      ref={titleInputRef}
                      disabled={isLoading}
                      className={`w-full p-4 bg-gray-50 dark:bg-gray-900 border ${
                        errors.title
                          ? "border-red-400"
                          : "border-gray-200 dark:border-gray-700"
                      } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                      value={bookData.title}
                      onChange={(e) => {
                        setBookData({ ...bookData, title: e.target.value });
                        if (errors.title) setErrors({ ...errors, title: "" });
                      }}
                      placeholder="Enter book title"
                    />
                    <AnimatePresence>
                      {errors.title ? (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
                        >
                          <FaExclamationCircle size={18} />
                        </motion.div>
                      ) : bookData.title ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                        >
                          <FaCheckCircle size={18} />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    <AnimatePresence>
                      {errors.title && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-500 text-xs mt-1.5 ml-1 flex items-center"
                        >
                          <FaExclamationCircle className="mr-1.5" size={12} />
                          {errors.title}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Author Field */}
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                    <FaUser className="mr-2 text-indigo-500" size={18} /> Author
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      disabled={isLoading}
                      className={`w-full p-4 bg-gray-50 dark:bg-gray-900 border ${
                        errors.author
                          ? "border-red-400"
                          : "border-gray-200 dark:border-gray-700"
                      } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                      value={bookData.author}
                      onChange={(e) => {
                        setBookData({ ...bookData, author: e.target.value });
                        if (errors.author) setErrors({ ...errors, author: "" });
                      }}
                      placeholder="Enter author name"
                    />
                    <AnimatePresence>
                      {errors.author ? (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
                        >
                          <FaExclamationCircle size={18} />
                        </motion.div>
                      ) : bookData.author ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                        >
                          <FaCheckCircle size={18} />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    <AnimatePresence>
                      {errors.author && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-500 text-xs mt-1.5 ml-1 flex items-center"
                        >
                          <FaExclamationCircle className="mr-1.5" size={12} />
                          {errors.author}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Description Field */}
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                    <FaAlignLeft className="mr-2 text-indigo-500" size={18} />{" "}
                    Description
                  </label>
                  <div className="relative group">
                    <textarea
                      disabled={isLoading}
                      className={`w-full p-4 bg-gray-50 dark:bg-gray-900 border ${
                        errors.description
                          ? "border-red-400"
                          : "border-gray-200 dark:border-gray-700"
                      } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                      rows="3"
                      value={bookData.description}
                      onChange={(e) => {
                        setBookData({
                          ...bookData,
                          description: e.target.value,
                        });
                        if (errors.description)
                          setErrors({ ...errors, description: "" });
                      }}
                      placeholder="Enter book description"
                    />
                    <AnimatePresence>
                      {errors.description ? (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-3 top-4 text-red-500"
                        >
                          <FaExclamationCircle size={18} />
                        </motion.div>
                      ) : bookData.description ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 top-4 text-green-500"
                        >
                          <FaCheckCircle size={18} />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    <AnimatePresence>
                      {errors.description && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-500 text-xs mt-1.5 ml-1 flex items-center"
                        >
                          <FaExclamationCircle className="mr-1.5" size={12} />
                          {errors.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Published Date Field */}
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                    <FaCalendar className="mr-2 text-indigo-500" size={18} />{" "}
                    Published Date
                  </label>
                  <div className="relative group">
                    <input
                      type="date"
                      disabled={isLoading}
                      className={`w-full p-4 bg-gray-50 dark:bg-gray-900 border ${
                        errors.published_date
                          ? "border-red-400"
                          : "border-gray-200 dark:border-gray-700"
                      } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                      value={bookData.published_date}
                      onChange={(e) => {
                        setBookData({
                          ...bookData,
                          published_date: e.target.value,
                        });
                        if (errors.published_date)
                          setErrors({ ...errors, published_date: "" });
                      }}
                    />
                    <AnimatePresence>
                      {errors.published_date ? (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
                        >
                          <FaExclamationCircle size={18} />
                        </motion.div>
                      ) : bookData.published_date ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                        >
                          <FaCheckCircle size={18} />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    <AnimatePresence>
                      {errors.published_date && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-500 text-xs mt-1.5 ml-1 flex items-center"
                        >
                          <FaExclamationCircle className="mr-1.5" size={12} />
                          {errors.published_date}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 space-y-3">
                <Button
                  name="Save Book"
                  type="submit"
                  icon={FaSave}
                  variant="primary"
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                  className="py-4 rounded-xl text-base font-medium shadow-lg hover:shadow-indigo-200"
                />
                <Button
                  name="Cancel"
                  onClick={handleClose}
                  icon={FaTimes}
                  variant="ghost"
                  fullWidth
                  disabled={isLoading}
                  className="py-3 rounded-xl text-base"
                />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddBookModal;
