import React from "react";
import clsx from "clsx";

type Variant =
  | "primary"
  | "success"
  | "danger"
  | "outline-success"
  | "outline-danger";

type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  success: "btn-success",
  danger: "btn-danger",
  "outline-success": "btn-outline-success",
  "outline-danger": "btn-outline-danger",
};

const sizeClass: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "",
  lg: "px-5 py-3 text-base rounded-xl",
};

export default function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={clsx("btn", variantClass[variant], sizeClass[size], className)} {...props}>
      {children}
    </button>
  );
}
