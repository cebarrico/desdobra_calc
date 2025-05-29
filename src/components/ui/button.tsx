import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "gradient";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg";

  const variantClasses = {
    default:
      "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 shadow-purple-500/30",
    outline:
      "border-2 border-purple-500/50 text-purple-300 bg-gray-700/50 hover:bg-purple-900/30 hover:border-purple-400 shadow-purple-500/20",
    destructive:
      "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-red-500/30",
    gradient:
      "bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white hover:from-purple-500 hover:via-purple-600 hover:to-indigo-500 shadow-purple-500/40",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]}
        ${className || ""}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
