type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-[#0b57d0] text-white shadow-sm hover:bg-[#0842a0]"
      : "border border-[#d0d7de] bg-white text-[#1f1f1f] hover:bg-[#f8fafd]";

  return (
    <button
      className={`h-10 rounded-lg px-4 text-sm font-semibold transition ${variantClass} ${className}`}
      {...props}
    />
  );
}
