import React from "react";
import { IconContext } from "react-icons";
import { FaSpinner } from "react-icons/fa";

const Button = ({
  name,
  onClick,
  icon: Icon,
  variant = "primary",
  size = "small",
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {loading ? (
        <IconContext.Provider value={{ size: "1.25em", className: "inline-block animate-spin" }}>
          <span className="mr-2">
            <FaSpinner />
          </span>
        </IconContext.Provider>
      ) : Icon && (
        <IconContext.Provider value={{ size: "1.25em", className: "inline-block" }}>
          <span className="mr-2">
            <Icon />
          </span>
        </IconContext.Provider>
      )}
      {name}
    </button>
  );
};

export default Button;
