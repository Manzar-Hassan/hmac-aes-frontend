import React, { useState, useRef } from "react";
import { LuCopy } from "react-icons/lu";
import {
  FaUser,
  FaCalendar,
  FaBook,
  FaEllipsisH,
  FaBookmark,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import CustomTooltip from "./CustomTooltip";

const BookCard = ({ book }) => {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeoutRef = useRef(null);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(book.id)
      .then(() => {
        setCopied(true);
        setShowTooltip(true);

        // Clear any existing timeout
        if (tooltipTimeoutRef.current) {
          clearTimeout(tooltipTimeoutRef.current);
        }

        // Set new timeout to hide both the check icon and tooltip
        tooltipTimeoutRef.current = setTimeout(() => {
          setCopied(false);
          setShowTooltip(false);
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handleMouseEnter = () => {
    if (!copied) setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    if (!copied) setShowTooltip(false);
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Generate a gradient background based on the book title
  const generateGradient = () => {
    // Simple hash function to generate consistent colors for the same title
    const hash = book.title.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const h1 = Math.abs(hash % 360);
    const h2 = (h1 + 40) % 360;

    return `linear-gradient(135deg, hsl(${h1}, 80%, 85%), hsl(${h2}, 80%, 65%))`;
  };

  const shortId = book.id.slice(0, 6);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-indigo-100 group">
      {/* Book cover/gradient banner */}
      <div
        className="h-32 w-full flex items-center justify-center relative"
        style={{ background: generateGradient() }}
      >
        <FaBook className="text-white text-4xl opacity-30" />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button className="p-1.5 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full text-white transition-all">
            <FaBookmark className="text-sm text-purple-500" />
          </button>
          <button className="p-1.5 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full text-white transition-all">
            <FaEllipsisH className="text-sm text-purple-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900 font-geist-sans group-hover:text-indigo-700 transition-colors line-clamp-1">
            {book.title}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 bg-gray-100 rounded-2xl text-gray-600 font-mono border-r border-gray-200">
              {shortId}
            </span>
            <div className="relative">
              <button
                onClick={copyToClipboard}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label="Copy book ID"
              >
                {copied ? (
                  <FaCheck className="text-green-500 text-xs animate-fadeIn" />
                ) : (
                  <LuCopy className="text-xs cursor-pointer text-purple-800" />
                )}
              </button>

              {/* Custom tooltip */}
              {showTooltip && (
                <CustomTooltip text={copied ? "Copied!" : "Copy ID"} />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2 text-gray-700">
          <FaUser className="text-indigo-600 text-sm" />
          <span className="font-medium text-sm">{book.author}</span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-gray-700">
          <FaCalendar className="text-indigo-600 text-sm" />
          <span className="text-sm">{formatDate(book.published_date)}</span>
        </div>

        <div className="text-gray-600 mb-5 line-clamp-3 text-sm leading-relaxed">
          {book.description}
        </div>

        <div className="flex justify-between items-center text-xs text-gray-400 pt-3 border-t border-gray-100">
          <span>Created: {formatDate(book.created_at)}</span>
          <span>Updated: {formatDate(book.updated_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
