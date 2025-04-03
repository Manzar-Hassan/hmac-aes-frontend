import React from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { FaSpinner } from "react-icons/fa6";

/**
 * Button component for user interactions
 *
 * @param {Object} props - Component props
 * @returns {React.ReactElement} Button component
 */
const Button = ({
  children,
  name,
  onClick,
  type = "button",
  icon: Icon,
  iconPosition = "left",
  variant = "primary",
  size = "small",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  ariaLabel,
  ...rest
}) => {
  // Use name as children if children is not provided
  const buttonText = children || name;
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:translate-y-0.5 active:shadow-inner transform hover:-translate-y-0.5";

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 border border-transparent",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-400 border border-gray-200",
    danger:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 border border-transparent",
    success:
      "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 border border-transparent",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-400 border border-transparent",
    outline:
      "bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-800 shadow-none focus:ring-gray-400 border border-transparent",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-5 py-2.5 text-base",
    large: "px-6 py-3 text-lg",
  };

  const isRightIcon = iconPosition === "right";
  const hasIcon = Icon || loading;
  const iconSpacing = isRightIcon ? "ml-2.5" : "mr-2.5";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={
        ariaLabel || (typeof buttonText === "string" ? buttonText : undefined)
      }
      aria-busy={loading}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.medium}
        ${fullWidth ? "w-full" : ""}
        ${
          disabled || loading
            ? "opacity-70 cursor-not-allowed filter grayscale hover:bg-opacity-100"
            : "cursor-pointer hover:shadow-md group"
        }
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...rest}
    >
      {hasIcon && !isRightIcon && (
        <span className={iconSpacing}>
          <IconContext.Provider
            value={{
              size: "1.25em",
              className:
                "inline-block align-text-bottom" +
                (loading ? " animate-spin" : "") +
                (disabled ? "" : " group-hover:scale-110 transition-transform"),
            }}
          >
            {loading ? <FaSpinner /> : Icon && <Icon />}
          </IconContext.Provider>
        </span>
      )}

      {buttonText}

      {hasIcon && isRightIcon && (
        <span className={iconSpacing}>
          <IconContext.Provider
            value={{
              size: "1.25em",
              className:
                "inline-block align-text-bottom" +
                (loading ? " animate-spin" : "") +
                (disabled ? "" : " group-hover:scale-110 transition-transform"),
            }}
          >
            {loading ? <FaSpinner /> : Icon && <Icon />}
          </IconContext.Provider>
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "success",
    "warning",
    "outline",
    "ghost",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Button;
